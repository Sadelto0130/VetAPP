import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import registroRoutes from './routes/registro.routes.js'; 
import usuarioRoutes from './routes/auth.routes.js'
import mascotaRoutes from './routes/pet.routes.js'
import veterinarioRoutes from './routes/vet.routes.js' 

//Configuracion de express
const app = express(); 

app.use(morgan('dev'));
app.use(cookieParser()); // lee las cookies que se envian desde el frontend
app.use(express.json()) // convierte todo lo que llega en json a javascript
app.use(express.urlencoded({extended: false})) // permite enviar formularios desde el frontend

app.get('/', (req, res) => res.json({message: "Bienvenidos pagina vet"}));

app.use('/api', registroRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', mascotaRoutes);
app.use('/api', veterinarioRoutes);

// ruta para manejos de errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "Error",
    message: err.message
  });
})

export default app; 