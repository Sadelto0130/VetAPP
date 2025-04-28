import http from 'http';
import app from './app.js';
import { PORT } from './config.js';

const server = http.createServer(app);

// Setear timeout a 30 segundos
server.setTimeout(30000, (socket) => {
  console.log('Server timeout!');

  // Opcional: puedes destruir la conexión si quieres
  socket.destroy();
});

// Ahora iniciar el servidor
server.listen(PORT, () => {
  console.log('Servidor iniciado en el puerto', PORT);
});
