function remote(options) {
  return descriptor => ({
    ...descriptor,
    extras: [{
      kind: 'field',
      placement: 'own',
      key: `remote@@${descriptor.key}`,
      descriptor: {
        enumerable: true,
        configurable: true,
        writable: false,
      },
      initialize() {
        return options;
      },
    }],
  });
}

export default {
  remote,
};
