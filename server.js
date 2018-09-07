//Server
const net = require("net");
const readline = require('readline');
const process = require('process');

const readlineInterface = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
});

const server = net
  .createServer(socket => {
      socket.setEncoding('utf-8');
      readlineInterface.prompt();
      readlineInterface.on("line" , (message) => {
        socket.write(message);
        readlineInterface.prompt();
      });

      socket.on('data' , (data) => {
        console.log("CLIENT : " + data);
        readlineInterface.prompt();
      });      
})
  .on("error", err => {
    throw err;
});

server.listen(9000 , 'localhost' , () => {
    console.log(`Server started on ${server.address().port}`)
});

