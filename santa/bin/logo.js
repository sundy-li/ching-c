'use strict';

const chalk = require('chalk');

module.exports = {
  show(version) {
    console.log('\n\n');
    console.log(chalk.bold.green(`
  _____  ____  ____   ______   ____         __  _      ____
  / ___/ /    ||    \\ |      | /    |       /  ]| |    |    |
 (   \\_ |  o  ||  _  ||      ||  o  |      /  / | |     |  |
  \\__  ||     ||  |  ||_|  |_||     |     /  /  | |___  |  |
  /  \\ ||  _  ||  |  |  |  |  |  _  |    /   \\_ |     | |  |
  \\    ||  |  ||  |  |  |  |  |  |  |    \\     ||     | |  |
   \\___||__|__||__|__|  |__|  |__|__|     \\____||_____||____|
   `));
   console.log(chalk.blue(`
   Version: ${version}\tPoweredBy: Dataworks Team
   `))
   console.log();
  }
}
