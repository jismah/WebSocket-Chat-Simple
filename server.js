const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket, req) => {
    console.log('Client connected: ' + socket.remoteAddress);

  socket.on('chat message', (msg) => {
    console.log(socket.remoteAddress+ ' say: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.remoteAddress);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
