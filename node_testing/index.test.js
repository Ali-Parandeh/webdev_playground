const assert = require("assert");
const { forEach, map } = require("./index");

// No longer is needed because of mocha's it methods
// const test = (desc, fn) => {
//   console.log("----", desc);
//   try {
//     fn();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

it("The forEach function test", () => {
  let sum = 0;
  forEach([1, 2, 3], value => {
    sum += value;
  });

  assert.strictEqual(sum, 6, "Expected forEach to sum the array");

  // No longer needed because of assert.strictEqual method
  //   if (sum !== 7) {
  //     throw new Error("Expected the summing array to equal 6");
  //   }
});

it("The map function test", () => {
  const result = map([1, 2, 3], value => value * 2);

  assert.deepStrictEqual(result, [2, 4, 6]);

  // No longer needed because of assert.deepStrictEqual method
  //   assert.strictEqual(result[0], 2);
  //   assert.strictEqual(result[1], 4);
  //   assert.strictEqual(result[2], 6);

  // No longer needed because of assert.strictEqual
  //   if (result[0] != 2) {
  //     throw new Error(`Expected to see 2 but saw ${result[0]}`);
  //   }
  //   if (result[1] != 4) {
  //     throw new Error(`Expected to see 4 but saw ${result[1]}`);
  //   }
  //   if (result[2] != 6) {
  //     throw new Error(`Expected to see 6 but saw ${result[2]}`);
  //   }
});
