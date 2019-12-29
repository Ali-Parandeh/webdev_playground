const fs = require("fs");
const path = require("path");

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
        this.testFiles.push({ name: filepath });
        // testFiles === [{name: '/Users/.../autcomplete.test.js'}]
      } else if (stats.isDirectory()) {
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
    // NOTE: global variable is available to all files in the node environment. When a function is not defined, node
    // will look at the properties attached to the global variable next before throwing an error.
    const beforeEaches = [];
    global.beforeEach = fn => {
      beforeEaches.push(fn);
    };

    global.it = (desc, fn) => {
      beforeEaches.forEach(func => func());
      fn();
    };

    for (let file of this.testFiles) {
      // NOTE: When we require a filepath, node finds the file, loads all the code in it and executes them.
      require(file.name);
    }
  }
}

module.exports = Runner;
