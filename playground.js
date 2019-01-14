const Core = require('./build/core.lib');

const endpoint = new Core.net.Endpoint({
  port: 8080,
  name: 'Test',
});

endpoint.start();


const endpoint2 = new Core.net.Endpoint({
  port: 8081,
  name: 'Test3',
});

endpoint2.start();

endpoint2.connectToEndpointViaSocket('http://localhost:8080');