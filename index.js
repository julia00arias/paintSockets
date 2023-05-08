const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(`Nuevo cliente conectado con id ${socket.id}`);

  socket.on("drawPoint", ({ x, y, color }) => {
    io.emit('drawPoint', { x, y, color });
  });

  socket.on("drawLine", ({ xx1, yy1, xx2, yy2, color}) => {
    io.emit('drawLine', { xx1, yy1, xx2, yy2, color });
  });

  socket.on("drawArc", ({ x1, y1, raizCuadrada, color}) => {
    io.emit('drawArc', { x1, y1, raizCuadrada, color });
  });

  socket.on('joinRoom', (room) => {
    console.log(`User ${socket.id} joined room ${room}`);
    socket.join(room);
  });

  socket.on('leaveRoom', (room) => {
    console.log(`User ${socket.id} left room ${room}`);
    socket.leave(room);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
