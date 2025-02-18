//Configuracion de express

import express from 'express';
import morgan from 'morgan';

const app = express(); 

app.use(morgan('dev'));
app.use(express.json()) // convierte todo lo que llega en json a javascript
app.use(express.urlencoded({extended: false})) // permite enviar formularios desde el frontend

app.get('/', (req, res) => res.json({message: "Bienvenidos pagina vet"}));

// ruta para manejos de errores
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "Error",
    message: err.message
  });
})

export default app;