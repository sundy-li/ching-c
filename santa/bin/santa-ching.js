'use strict';

const program = require('commander');

program
  .command('start', 'start a stanta-ching project for development')
  .command('build', 'build a santa-ching project')
  // .command('publish', 'publish a santa-ching project')
  .parse(process.argv);
