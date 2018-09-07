'use strict';

const consts = require('./consts');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  getComponentPathList() {
    const src = consts.PATH_OF_SRC;
    const components = fs
      .readdirSync(src)
      .map(dir => path.join(src, dir))
      .filter(dir => {
        const stats = fs.statSync(dir);
        return stats.isDirectory();
      });
    return components;
  }
}
