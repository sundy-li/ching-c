'use strict';

const path = require('path');

module.exports = {
  PATH_OF_SANTA_FOR_TEMP: path.join(
    process.cwd(), '.santa-tmp'
  ),
  PATH_OF_SRC: path.join(
    process.cwd(), 'src/components'
  ),
  PATH_OF_BUILD: path.join(
    process.cwd(), 'build'
  ),
  PATH_OF_LIB: path.join(
    process.cwd(), 'lib'
  ),
  PATH_OF_DEMO: 'demo.js',
};
