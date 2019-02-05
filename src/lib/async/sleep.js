module.exports = async function sleep(ms) {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
  await promise;
};
