#!/usr/bin/env node

import commander = require('commander');

const requireCmd = cmd => (...args) => require(`./commands/${cmd}`).default(args);
const requireCmdAsync = cmd => async (...args) => await require(`./commands/${cmd}`).default(args);

const commands = {
  version: 'version',
  look: 'look',
};

commander
  .command(commands.version)
  .action(requireCmd(commands.version));

commander
  .command(`${commands.look} <filename>`)
  .option('-d, --delimiter <delimiter>', 'CSV delimiter (default: ,)')
  .option('-l, --line-numbers', 'Show a column with line numbers')
  .action(requireCmdAsync(commands.look));

commander.parse(process.argv);
