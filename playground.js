const Core = require('./build/core.lib');

const endpoint = new Core.net.Endpoint({
  port: 8080,
  name: 'Test',
});

const endpoint2 = new Core.net.Endpoint({
  port: 8081,
  name: 'Test3',
});

(async () => {
  await endpoint.start();
  await endpoint2.start();
  const session = await endpoint2.connectToEndpointViaSocket('http://localhost:8080');
  session.subscribe('lol', (arg, arg2,arg3) => {
    console.log('on event:', arg, arg2, arg3);
  });
  console.log('read', await session.testMethod(' world'));

})();