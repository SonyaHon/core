module.exports = async function task(context, method, ...args) {
  return new Promise(((resolve) => {
    context[method](...args, function clb() {
      const result = [];
      for (const arg of arguments) {
        result.push(arg);
      }
      resolve(result);
    });
  }));
};
