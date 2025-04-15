import app from './app.js';
import { PORT } from './config.js';

// conexion al servidor
app.listen(PORT)
console.log('Servidor iniciado!', PORT);