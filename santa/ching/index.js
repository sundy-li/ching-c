'use strict';

const fs = require('fs-extra');
const StoryBook = require('./storybook');
const Builder = require('./builder');
const consts = require('./consts');

class Ching {


  prepare() {
    fs.mkdirpSync(consts.PATH_OF_SANTA_FOR_TEMP);
  }

  clearup() {
    fs.removeSync(consts.PATH_OF_SANTA_FOR_TEMP);
  }

  async start() {
    this.prepare();
    await new StoryBook().start();
    // const config = require('../webpack/webpack.dev.js');
    // await this._run(config);
    this.clearup();
  }
  async build() {
    // force cleanup
    this.prepare();
    // const config = require('../webpack/webpack.prod.js');
    // await this._run(config);
    await new Builder().run();
    this.clearup();
  }
  // async publish() {
  // }
}

module.exports = Ching;
