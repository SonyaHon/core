export default async (ms) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
  await promise;
};
