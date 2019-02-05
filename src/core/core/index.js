const path = require('path');
const Endpoint = require('../../lib/net/endpoint');
const TestService = require('./services/test-service');

const endpoint = new Endpoint({
  mode: 'online',
  name: 'core',
  description: 'Main endpoint, hub for everything else',
  port: 8080,
  entry: path.join(__dirname, './ui/entry.js'),
});

const testService = new TestService();

endpoint.addServiceInstance(testService);


(async () => {
  await endpoint.start();
})();
