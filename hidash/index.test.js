const { forEach, map } = require("./index");

const test = (desc, fn) => {
  console.log("----", desc);
  try {
    fn();
  } catch (err) {
    console.log(err.message);
  }
};

test("The forEach function test", () => {
  let sum = 0;
  forEach([1, 2, 3], value => {
    sum += value;
  });

  if (sum !== 7) {
    throw new Error("Expected the summing array to equal 6");
  }
});

test("The map function test", () => {
  const result = map([1, 2, 3], value => value * 2);

  if (result[0] != 2) {
    throw new Error(`Expected to see 2 but saw ${result[0]}`);
  }
  if (result[1] != 4) {
    throw new Error(`Expected to see 4 but saw ${result[1]}`);
  }
  if (result[2] != 6) {
    throw new Error(`Expected to see 6 but saw ${result[2]}`);
  }
});
