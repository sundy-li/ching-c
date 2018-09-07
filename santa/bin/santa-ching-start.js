'use strict';

const Ching = require('../ching');
const chalk = require('chalk');

(async function(){
  console.log('> Santa-Ching is starting ...');
  await new Ching().start();
  console.log(`> Santa-Ching is ${chalk.bold.cyan('done')}`);
})();

