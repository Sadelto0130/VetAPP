import http from 'http';
import app from './app.js';
import { PORT } from './config.js';

const server = http.createServer(app);

// Extiende el tiempo de vida de la conexión
server.keepAliveTimeout = 120000; // 2 minutos
server.headersTimeout = 125000;   // Evita que se corte antes del keep-alive

// Setear timeout a 2 minutos para respuestas largas
server.setTimeout(120000, (socket) => {
  console.log('Server timeout!');
});

// Ahora iniciar el servidor
server.listen(PORT, () => {
  console.log('Servidor iniciado en el puerto', PORT);
});
