'use strict';
const consts = require('./consts');
const chalk = require('chalk');
const path = require('path');
// const shell = require('shelljs');
const { spawn } = require('child_process');
const fs = require('fs-extra');
const core = require('./core');
const chokidar = require('chokidar');
const nunjucks = require('nunjucks');

class StoryBook {

  _hasDemo(component) {
    const demo = path.join(component, consts.PATH_OF_DEMO);
    return fs.existsSync(demo);
  }

  _generateStoryBookConfig(config) {
    const js = path.join(
      config.configDir,
      'config.js'
    );
    let content = `
import { configure } from '@storybook/react';\n
function loadStories() {\n
  require('./index.js');\n
}\n
configure(loadStories, module);\n
    `;
    fs.writeFileSync(js, content);
  }

  _generateStories(components, config) {
    const stories = path.join(
      config.configDir,
      'index.js'
    );
    let content = `
import React from 'react';\n
import { storiesOf } from "@storybook/react";\n
    `;
    components.forEach(component => {
      if(this._hasDemo(component)) {
        content +=
          `import ${path.basename(component)} from '${path.join(component, consts.demo)}';\n`;
      } else {
        content +=
          `import ${path.basename(component)} from '${component}';\n`;
      }
    });
    // todo import index.scss
    content +=
      `storiesOf('ching-react-components', module)\n`;

    components.forEach(component => {
      const base = path.basename(component);
      if (this._hasDemo(component)) {
        content +=
        `.add('${base}', ${base})\n`;
      } else {
        content +=
        `.add('${base}', () => (<${base} />))\n`;
      }
    })
    fs.writeFileSync(stories, content);
  }

  async _exec(config) {
    const bin = 'node ./node_modules/.bin';
    let command = `${bin}/cross-env NODE_ENV=development && ${bin}/start-storybook -p 6006`
    command += ` -c ${config.configDir}`;
    command += ` -s ${config.staticDir}`;
    console.log(chalk.cyan(command));
    const shell = spawn(command, [], {
      shell: true,
      stdio: 'inherit'
    })
    // shell.stdout.on('data', data => {
    //   process.stdout.write(data);
    // })
    // shell.stderr.on('data', data => {
    //   process.stderr.write(data);
    // });
    await new Promise(resolve => {
      shell.on('close', resolve);
    })
    // await new Promise((resolve, reject) => {
    //   const child = shell.exec(command, {
    //     async: true
    //   }, (code) => {
    //     if(code === 0) {
    //       resolve();
    //     } else {
    //       reject();
    //     }
    //   });
    //   child.stdout.pipe(process.stdout);
    //   child.stderr.pipe(process.stderr);
    // })
  }

  _prepareStoriesFolders() {
    const staticDir = path.join(
      consts.PATH_OF_SANTA_FOR_TEMP,
      'stories'
    );
    const configDir = path.join(
      consts.PATH_OF_SANTA_FOR_TEMP,
      '.storybook'
    );
    console.log(chalk.cyan(`Static Folder: ${staticDir}`));
    fs.mkdirpSync(staticDir);
    console.log(chalk.cyan(`Config Folder: ${configDir}`));
    fs.mkdirpSync(configDir);
    return { staticDir, configDir };
  }

  _generateStoryBookWebpackConfig(config) {
    const target = path.join(
      config.configDir,
      'webpack.config.js'
    );
    const http = require.resolve('../apis/http.js');
    let webpackConfig = require.resolve('../webpack/webpack.storybook.js');
    webpackConfig = nunjucks.render(webpackConfig, { http });
    fs.writeFileSync(target, webpackConfig);
  }

  async _watch(config) {
    console.log(chalk.cyan('watching ', consts.PATH_OF_SRC));
    chokidar.watch(consts.PATH_OF_SRC, {
      ignoreInitial: true,
      depth: 0,
    }).on('all', (event) => {
      console.log(chalk.cyan('Watched Folder Event', event))
      if(event === 'addDir' || event === 'unlinkDir') {
        const components = core.getComponentPathList();
        console.log('> Find Components:');
        components.forEach(component => {
          console.log(chalk.cyan(component));
        });
        console.log('> Regenerate Stories');
        this._generateStories(components, config);
      }
    });
    // chokidar.watch(consts.PATH_OF_SRC, {
    //   ignoreInitial: true,
    //   persistent: true,
    // }).on('all', (event) => {
    //   console.log(chalk.cyan('Watched Folder Event2', event))
    //   if(event === 'addDir') {
    //     // this._generateStoryBookConfig(config);
    //   }
    // });
  }

  _generateScriptTagToComponent(config) {
    const target = path.join(
      config.configDir,
      'preview-head.html'
    );
    let content = [];
    content.push('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/antd/3.8.0/antd.css" />');
    content.push('<script src="//alinw.alicdn.com/platform/c/??react/15.6.2/react-with-addons.js,react/15.6.2/react-dom.js"></script>');
    content.push('<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.js"></script>')
    content.push('<script src="//cdnjs.cloudflare.com/ajax/libs/antd/3.8.0/antd.js"></script>');
    content.push('<script src="//f.alicdn.com/echarts/4.0.2/echarts.js"></script>');
    fs.writeFileSync(target, content.join("\n"));
  }

  _generateScriptTagToMainUI(config) {
    const target = path.join(
      config.configDir,
      'manager-head.html'
    );
    let content = [];
    content.push('<script src="//alinw.alicdn.com/platform/c/??react/15.6.2/react-with-addons.js,react/15.6.2/react-dom.js"></script>');
    fs.writeFileSync(target, content.join("\n"));
  }

  async start() {
    const components = core.getComponentPathList();
    console.log('> Find Components:');
    components.forEach(component => {
      console.log(chalk.cyan(component));
    });
    console.log('> Prepare Stories Folders');
    const config = this._prepareStoriesFolders();
    this.config = config;
    console.log('> Generate Stories');
    this._generateStories(components, config);
    this._generateStoryBookConfig(config);
    console.log('> Generate webpack.config.js');
    this._generateStoryBookWebpackConfig(config);
    console.log('> Generate preview-head.html');
    this._generateScriptTagToComponent(config);
    console.log('> Generate manager-head.html');
    this._generateScriptTagToMainUI(config);
    console.log('> Enable Storybook');
    this._watch(config);
    console.log('> Start Storybook');
    await this._exec(config);
  }
}

module.exports = StoryBook;
