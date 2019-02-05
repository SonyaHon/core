const Core = require('./src/lib/');

const endpoint = new Core.net.Endpoint({
  port: 8080,
  name: 'Test',
  description: 'Testing out web',
  mode: Core.ONLINE,
});

(async () => {
  await endpoint.start();
})();
