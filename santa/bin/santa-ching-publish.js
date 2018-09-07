'use strict';

const Ching = require('../ching');

(async function(){
  console.log('> Santa-Ching is publishing ...');
  await new Ching().publish();
  console.log(`> Santa-Ching is ${chalk.bold.cyan('done')}`);
})();
