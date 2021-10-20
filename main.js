#!/usr/bin/node
const program = require("commander");
const list = require("./list");
const path = require("path");

program.parse(process.argv);
const targetDir = program.args[0];

if (!targetDir) {
  console.error(
    "Target directory is not set. Run something like `npm run list ./dir`"
  );
  return;
}

list(targetDir);
