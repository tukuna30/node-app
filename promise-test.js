let promise1 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve("Promise 1 resolved");
  }, 2000);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(function () {
    reject("Promise 2 rejected");
  }, 300);
});

promise1
  .then(
    (resolvedMessage) => {
      console.log("resolved: ", resolvedMessage);
      return promise2;
    },
    (rejectedMessage) => {
      console.log("rejected: ", rejectedMessage);
    }
  )
  .then((resolvedMessage) => {
    console.log("resolved: ", resolvedMessage);
  })
  .catch((rejectedMessage) => console.log("Error: ", rejectedMessage));
