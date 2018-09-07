'use strict';

const webpack = require('webpack');
const format = require('webpack-format-messages');
const chalk = require('chalk');
const consts = require('./consts');
const fs = require('fs-extra');
const path = require('path');
const core = require('./core');
const child_process = require('child_process');
const opn = require('opn');
const zip = require('node-zip')();
const pkg = require(
  path.join(
    process.cwd(),
    'package.json'
  )
);

class Builder {

  _output(stats) {
    const messages = format(stats);
    if (!messages.errors.length && !messages.warnings.length) {
      const outputOptions =  {
        colors: { level: 2, hasBasic: true, has256: true, has16m: false },
        chunks: false,
        children: false,
        performance: true,
      };
      process.stdout.write(stats.toString(outputOptions) + "\n");
      console.log(chalk.cyan('Compiled successfully!'));
    }

    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      messages.errors.forEach(e => console.log(e));
      return;
    }

    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      messages.warnings.forEach(w => console.log(w));
    }
  }

  _run(config) {
    return new Promise((resolve, reject) => {
      try {
        const compiler = webpack(config);
        compiler.run((err, stats) => {
          if (err) {
            console.log(chalk.red(err));
          }
          this._output(stats);
          resolve();
        });
      } catch(e) {
        reject(e);
      }
    }).catch (function(e) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      console.log(e.message || e);
      console.log();
    });
  }

  // async _buildForLibrary() {
  //   let cmd = `node ./node_modules/.bin/babel `;
  //   cmd += path.join(consts.PATH_OF_SANTA_FOR_TEMP, 'entry');
  //   cmd += ` --out-dir `;
  //   cmd += path.join(consts.PATH_OF_LIB);
  //   cmd += ' --copy-files';
  //   console.log(chalk.cyan(cmd));
  //   child_process.spawnSync(
  //     cmd, [], {
  //       shell: true,
  //       stdio: 'inherit'
  //     });
  // }

  async _build() {
    const config = require('../webpack/webpack.prod');
    config.entry = {
      index: path.join(
        consts.PATH_OF_SANTA_FOR_TEMP,
        'entry',
        'index.js'
      )
    };
    config.output.path = consts.PATH_OF_BUILD;
    config.output.filename = '[name].umd.js';
    if(!config.resolve) config.resolve = {};
    if(!config.resolve.alias)
      config.resolve.alias = {};
    config.resolve.alias['core/http'] = require.resolve('../apis/http.js');
    await this._run(config);

    fs.copyFileSync(
      path.join(
        consts.PATH_OF_SANTA_FOR_TEMP,
        'entry',
        'config.json'
      ),
      path.join(
        consts.PATH_OF_BUILD,
        'config.json'
      ),
    );
  }

  _generateComponentLazyAlias(components) {
    let content = `export default {\n`;
    const importFns = components.map(component => {
      const name = path.basename(component);
      const src =
      `${name}: $import => {
        return $import([]).then(() => {
          return import(/* webpackChunkName: "${name}" */
          /* webpackMode: "lazy" */
          "${component}").then(module => {
            return module;
          })
        })
      }`;
      return src;
    });
    content += importFns.join(',\n');
    content += `\n}\n`;
    const target = path.join(
      consts.PATH_OF_SANTA_FOR_TEMP,
      'entry',
      'components-lazy-alias.js'
    );
    fs.writeFileSync(
      target,
      content
    );
  }

  _generateEntry(components) {
    const src = path.dirname(
      require.resolve('../wrapper/index.js'));
    const dst = path.join(
      consts.PATH_OF_SANTA_FOR_TEMP,
      'entry'
    );
    fs.copySync(
      src,
      dst
    );
    console.log(chalk.cyan('Copy Entry Files: '))
    console.log(chalk.cyan(`From: ${src}`));
    console.log(chalk.cyan(`To: ${dst}`));
    this._generateComponentLazyAlias(components);
  }

  _generateComponentConfig(component) {
    const name = path.basename(component);
    const propertiesFileName = path.join(component, 'properties.json');
    const iconFileName = path.join(component, 'icon.png');
    let config = { name };
    if(fs.existsSync(propertiesFileName)) {
      let properties = {};
      try {
        properties = JSON.parse(fs.readFileSync(propertiesFileName));
        config.description = properties.description || '';
        config.dsl = properties.dsl || `<${name} />`;
      } catch(e) {
        console.log(chalk.red(e));
      }
    }
    if(fs.existsSync(iconFileName)) {
      config.icon = `${name}_icon.png`;
    }
    return config;
  }

  _generateConfig(components) {
    let content = {};
    content.name = pkg.name;
    content.version = pkg.version;
    content.components = components.map(this._generateComponentConfig.bind(this));
    content = JSON.stringify(content, null, '\t');
    const target = path.join(
      consts.PATH_OF_SANTA_FOR_TEMP,
      'entry',
      'config.json'
    );
    fs.writeFileSync(
      target,
      content
    );
  }

  async _compressBuild() {
    const base = process.cwd();
    const release = path.join(base, 'release');
    let name = `${pkg.name}_${pkg.version}.zip`;
    name = path.join(release, name);
    const build = consts.PATH_OF_BUILD;
    const files = fs.readdirSync(build).map(file => path.join(build, file));
    files.forEach(file => {
      zip.file(path.basename(file), fs.readFileSync(file));
    });
    var data = zip.generate({ base64:false, compression: 'DEFLATE' });
    // it's important to use *binary* encode
    fs.mkdirpSync(release);
    fs.writeFileSync(name, data, 'binary');
  }

  _copyIcon(components) {
    (components || []).forEach(component => {
      const icon = path.join(component, 'icon.png');
      const target = path.join(
        consts.PATH_OF_BUILD,
        `${path.basename(component)}_icon.png`
      );
      if(fs.existsSync(icon)) {
        console.log(chalk.cyan(`Copy ${icon} => ${target}`));
        fs.copyFileSync(icon, target);
      }
    })
  }

  async run() {
    const components = core.getComponentPathList();
    console.log('> Find Components:');
    components.forEach(component => {
      console.log(chalk.cyan(component));
    });
    console.log('> Generate entry js');
    this._generateEntry(components);
    console.log('> Generate config js');
    this._generateConfig(components);
    // console.log('> Build Target To LIBRARY');
    // await this._buildForLibrary();
    console.log('> Build Target To CDN');
    await this._build();

    console.log('> Copy Icon');
    await this._copyIcon(components);

    console.log('> Compress Build');
    this._compressBuild();

    // TODO, 替换url
    console.log();
    console.log(chalk.yellow('组件构建完成，打开https://app.data.aliyun.com上传组件'));
    console.log();

  }
}

module.exports = Builder;
