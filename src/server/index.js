'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

server.start((err) => {
  if (err) {
    return console.error(err);
  }

  console.log('listening...');

});
