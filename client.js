//Client side app
const net = require('net');
const readline = require('readline');
const process = require('process');
const socket = new net.Socket();
const EventEmitter = require('events');
const event = new EventEmitter();



const port = process.env.PORT || 8000;

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

socket.connect(port, 'localhost', () => {
    socket.setEncoding('utf-8');
    readlineInterface.prompt();
    readlineInterface.on("line", (message) => {
        socket.write(message);
        readlineInterface.prompt();
    });
});

socket.on('data', (data) => {
    console.log(data);
    readlineInterface.prompt();
});
