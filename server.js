const net = require("net");
const readline = require('readline');
const process = require('process');
const EventEmitter = require('events');
const event = new EventEmitter();
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

let connections = [];

let message;
const server = net
  .createServer(socket => {

    connections.push(socket);
    console.log('No. of active connections : ' + connections.length);

    socket.on('data', (data) => {
      message = decoder.write(Buffer.from(data));
      event.emit('message');
    });

    event.on('message', () => {
      socket.write(message);
    })


  })
  .on("error", err => {
    throw err;
  });

server.listen(8000, 'localhost', () => {
  console.log(`Server started on ${server.address().port}`)
});



