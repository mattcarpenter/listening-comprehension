'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');

const server = new Hapi.Server({
  debug: {
    request: ['error']
  }
});

server.connection({
  host: 'localhost',
  port: 8000
});

// Register inert for static file routing
server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
});

// Register vision for Jade template compiliation
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

// Other routes
server.route({ method: 'GET', path: '/', handler: require('./handlers/home') });
server.route({ method: 'GET', path: '/phrase', handler: require('./handlers/phrase') });

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

mongoose.connect('mongodb://localhost/lc');

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

