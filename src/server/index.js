'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
});

server.register(require('vision'), (err) => {
  if (err) {
    throw err;
  }

  server.views({
    engines: { jade: require('jade') },
    path: __dirname + '/views',
    compileOptions: {
      pretty: true
    }
  });
});

// Home route
server.route({ method: 'GET', path: '/', handler: require('./handlers/home') });

// Static File Routing
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
