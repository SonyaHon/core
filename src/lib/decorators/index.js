function remote(options) {
  return descriptor => ({
    ...descriptor,
    extras: [
      {
        kind: 'field',
        placement: 'own',
        key: `remote@@${descriptor.key}`,
        descriptor: {
          writable: true,
          configurable: true,
          enumerable: true,
        },
        initializer: () => options,
      },
    ],
  });
}

export default {
  remote,
};
