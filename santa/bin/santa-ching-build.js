'use strict';

const Ching = require('../ching');
const chalk = require('chalk');

(async function(){
  console.log('> Santa-Ching is building ...');
  await new Ching().build();
  console.log(`> Santa-Ching is ${chalk.bold.cyan('done')}`);
})();
