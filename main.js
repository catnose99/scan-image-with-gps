#!/usr/bin/node
const program = require("commander");
const list = require("./list");
const path = require("path");

program
  .option("-p, --peppers", "Add peppers")
  .option("-s, --silent", "Echo only file names with GPS")
  .parse(process.argv);
const targetDir = program.args[0];
const options = program.opts();

if (!targetDir) {
  console.error(
    "Target directory is not set. Run something like `npm run list ./dir`"
  );
  return;
}

list(targetDir, options.silent);
