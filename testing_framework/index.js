#!/usr/bin/env node
const Runner = require("./runner");
const runner = new Runner();

const run = async () => {
  await runner.collectFiles(process.cwd());
  // testFiles === [{ name: 'Users/..../index.test.js'},
  //                { name: 'Users/...../autocomplete.test.js'}]

  runner.runTests();
};

run();
