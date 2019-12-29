// Wait for a specified time before continuing with executing rest of the test code. Required for time dependent tests.
const waitFor = selector =>
  new Promise((resolve, reject) => {
    // NOTE: setInterval runs the callback function passed to it every 30ms - forever - unless stopped.
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        // NOTE: Need to clear timeout and interval before resolving the promise.
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);

    // NOTE: setTimeout runs the callback function passed to it after waiting for 2s.
    // Something is wrong if we have to wait this long so let's fail the test by rejecting the promise.
    const timeout = setTimeout(() => {
      // NOTE: Need to clear the interval above before rejecting the promise.
      clearInterval(interval);
      reject();
    }, 2000);
  });

// Before each test excute the callback function
// NOTE: The reason a new widget is created each time is to make tests independent of one another. No dependency failures.
beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Avengers" },
        { Title: "Some other movie" }
      ];
    },
    renderOption(movie) {
      return movie.Title;
    }
  });
});

it("Dropdown starts closed", () => {
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");

  //   NOTE: Should implementation
  //   dropdown.className.should.include("is-active");
});

it("After searching dropdown opens up", async () => {
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));
  await waitFor(".dropdown-item");
  const dropdown = document.querySelector(".dropdown");
  dropdown.className.should.include("is-active");
});

it("After searching, the dropdown displays some results", async () => {
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));
  await waitFor(".dropdown-item");
  const items = document.querySelectorAll(".dropdown-item");
  items.length.should.equal(3);
});
