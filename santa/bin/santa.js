#!/usr/bin/env node
'use strict';

const program = require('commander');
const logo = require('./logo');

const version = '0.1.0-alpha';

// show santa logo
logo.show(version);

program
  .version(version)
  .command('ching', 'santa tools for ching system')
  .parse(process.argv);
