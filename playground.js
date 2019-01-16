const Core = require('./build/core.lib');

const endpoint = new Core.net.Endpoint({
  port: 8080,
  name: 'Test',
});

const endpoint2 = new Core.net.Endpoint({
  port: 8081,
  name: 'Test3',
});

const service = new Core.service.BaseService('kek');

(async () => {
  await endpoint.start();
})();