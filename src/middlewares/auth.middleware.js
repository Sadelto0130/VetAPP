import jwt from 'jsonwebtoken';
import { pool } from '../db.js'; 

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({ 
      message: 'No estas autorizado'
    });
  }

  jwt.verify(token, 'xyz123', (err, decoded) => {
    if(err){
      return res.status(401).json({
        message: 'No estas autorizado'
      }); 
    }
    req.userId = decoded.idduenio;
    req.nombre = decoded.nombre;
    req.tipousuario = decoded.tipousuario;

    next();
  });
}

export const tipoUsuarioVet = async (req, res, next) => {
  const token = req.cookies.token;
  let tipoUsuario;

  if(!token){
    return res.status(401).json({
      message: 'No estas autorizado'
    });
  }
  
  jwt.verify(token, 'xyz123', (err, decoded) => {
    if(err){
      return res.status(401).json({
        message: 'No estas autorizado'
      });
    }
    tipoUsuario = decoded.tipousuario;
  })

  if(tipoUsuario === 'usuario'){
    return res.status(401).json({
      message: 'No estas autorizado'
    });
  }
  next()
}

export const tipoUsuarioClinic = async (req, res, next) => {
  const token = req.cookies.token;
  let tipoUsuario;

  if(!token){
    return res.status(401).json({
      message: 'No estas autorizado'
    });
  }
  
  jwt.verify(token, 'xyz123', (err, decoded) => {
    if(err){
      return res.status(401).json({
        message: 'No estas autorizado'
      });
    }
    tipoUsuario = decoded.tipousuario;
  })

  if(tipoUsuario === 'usuario' && tipoUsuario === 'veterinario'){
    return res.status(401).json({
      message: 'No estas autorizado'
    });
  }
  next()
}