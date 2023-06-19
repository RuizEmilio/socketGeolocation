// Importar los módulos necesarios
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Crear la aplicación de Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Ruta principal
app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(__dirname + '/public/index.html');
});

// Manejar la conexión de sockets
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  console.log(__dirname)

  // Manejar el evento de compartir ubicación
  socket.on('shareLocation', (location) => {
    console.log('Ubicación recibida:', location);
    // Aquí puedes realizar cualquier lógica adicional con la ubicación recibida

    // Emitir la ubicación a todos los demás clientes conectados
    socket.broadcast.emit('locationShared', location);
  });

  // Manejar la desconexión de sockets
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

// Iniciar el servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});