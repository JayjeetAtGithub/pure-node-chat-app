//Client
const net = require('net');
const readline = require('readline');
const process = require('process');
const socket = new net.Socket();

const readlineInterface = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
})

socket.connect(9000,'localhost',() => {
    socket.setEncoding('utf-8');
    readlineInterface.prompt();
      readlineInterface.on("line" , (message) => {
        socket.write(message);
        readlineInterface.prompt();
    });
});

socket.on('data' , (data) => {
    console.log("SERVER : " , data);
    readlineInterface.prompt();
});




