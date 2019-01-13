export default async (context, method, ...args) => new Promise((resolve) => {
  context[method](...args, function () {
    const result = [];
    for (arg of arguments) {
      result.push(arg);
    }
    resolve(result);
  });
});
