const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const ignoreDirs = ["node_modules", "ignore"];

class Runner {
  constructor() {
    this.testFiles = [];
  }

  // Loop through the targetPath file directory tree and find all test files.
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);
    // files === ['index.html', 'test', 'utils.js', 'index.js', ...]

    for (let file of files) {
      const filepath = path.join(targetPath, file);
      // filepath === '/Users/.../autocomplete.js'
      const stats = await fs.promises.lstat(filepath);
      //  stats = Stats {dev: 243242, mode: 4232, ....}

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath, shortName: file });
        // testFiles === [{name: '/Users/.../autcomplete.test.js'}]
      } else if (stats.isDirectory() && !ignoreDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filepath);
        // childFiles === ['autocomplete.test.js', 'test.html']

        files.push(...childFiles.map(f => path.join(file, f)));
        // files === ['index.js', 'utils.js', 'test/autocomplete.test.js', 'test/test.html']

        // NOTE: ... means expand the childFiles array and then push the items to the files array
        // files.push(childFiles) === ['index.js', 'utils.js', ['autocomplete.test.js', 'test.html']]
        // files.push(...childFiles) === ['index.js', 'utils.js', 'autocomplete.test.js', 'test.html']
      }
    }
  }

  // Run all test files
  async runTests() {
    // NOTE: BeforeEaches array is used to pass the beforeEach functions to 'it' function for execution before 'it' tests are run.
    const beforeEaches = [];
    global.beforeEach = fn => {
      beforeEaches.push(fn);
    };

    // NOTE: global variable is available to all files in the node environment. When a function is not defined, node
    // will look at the properties attached to the global variable next before throwing an error.
    global.it = (desc, fn) => {
      beforeEaches.forEach(func => func());
      // NOTE: Using try catch statement to prevent the test suite from stopping if a test fails
      try {
        fn();
        console.log(chalk.green(`\tOK - ${desc}`));
      } catch (err) {
        // NOTE 1: .replace method accepts a regular express to find all matched patterns and replace them with second arg string
        // NOTE 2:  /\n/g regular expression means globally (within the whole err.message) find every new line character
        const message = err.message.replace(/\n/g, "\n\t\t");
        console.log(chalk.red(`\tX - ${desc}`));
        console.log(chalk.red("\t", message));
      }
    };

    for (let file of this.testFiles) {
      console.log(chalk.grey(`---- ${file.shortName}`));

      // NOTE 1: When we require a filepath, node finds the file, loads all the code in it and executes them.
      // NOTE 2: Adding a try catch statement to prevent a dirty file from stopping the test suite.
      try {
        require(file.name);
      } catch (err) {
        console.log(chalk.red(err));
      }
    }
  }
}

module.exports = Runner;
