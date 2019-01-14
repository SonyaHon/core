export default async (context, method, ...args) => new Promise((resolve) => {
  context[method](...args, function () {
    const result = [];
    for (let arg of arguments) {
      result.push(arg);
    }
    resolve(result);
  });
});
