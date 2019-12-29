const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const render = async filename => {
  const filePath = path.join(process.cwd(), filename);
  const dom = await JSDOM.fromFile(filePath, {
    /* 
    NOTE: RunScripts is set to dangerously because with this option, jsdom can be fed any Node.js code which can be dangerous.
    Our code will be ours so we know it will not be dangerous and therefore why runScripts is set to 'dangerously' 
    */
    runScripts: "dangerously",
    resources: "usable"
  });

  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener("DOMContentLoaded", () => {
      resolve(dom);
    });
  });
};

module.exports = render;
