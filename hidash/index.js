module.exports = {
  forEach(arr, fn) {
    // Traditional Implementation
    // for (let i = 0; i < arr.length; i++) {
    //   const value = arr[i];
    //   fn(value, i);
    // }

    // For in Implementation
    // NOTE: When using for loops, in and of mean different things: For value of arr | for index in arr
    for (let index in arr) {
      fn(arr[index], index);
    }
  }
};
