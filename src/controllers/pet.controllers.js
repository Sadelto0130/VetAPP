import { pool } from "../db.js";
import jwt from 'jsonwebtoken';

export const addPet = async (req, res, next) => {
  const { nombre, raza, edad, tipo, peso, foto } = req.body;
  const idduenio = req.userId;

  const result = await pool.query(
    "INSERT INTO mascotas (nombre, raza, edad, tipo, peso, foto, idduenio) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [nombre, raza, edad, tipo, peso, foto, idduenio]
  );

  res.json(result.rows[0]);
  next(error);
};

export const getPets = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM mascota");
  return res.json(result.rows);
  next(error);
};

export const getPet = async (req, res, next) => {
  const id  = req.params.id;
  const result = await pool.query("SELECT * FROM mascotas WHERE idpet = $1", [id]);

  if(result.rowCount === 0) {
    return res.status(404).json({message: "Mascota no encontrada"});
  }

  return res.json(result.rows[0]);
  next(error);
};

export const updatePet = async (req, res, next) => {
  const id = req.params.id;
  const {nombre, foto, raza, edad, tipo, peso} = req.body;

  const datosOriginales = await pool.query("SELECT * FROM mascotas WHERE idpet = $1", [id]);

  if(datosOriginales.rowCount === 0) {
    return res.status(404).json({message: "Mascota no encontrada"});
  }

  const updatePet = {
    nombre: nombre ?? datosOriginales.rows[0].nombre,
    foto: foto ?? datosOriginales.rows[0].foto,
    raza: raza ?? datosOriginales.rows[0].raza,
    edad: edad ?? datosOriginales.rows[0].edad,
    tipo: tipo ?? datosOriginales.rows[0].tipo,
    peso: peso ?? datosOriginales.rows[0].peso
  }

  const result = await pool.query(
    "UPDATE mascotas SET nombre = $1, foto = $2, raza = $3, edad = $4, tipo = $5, peso = $6 WHERE idpet = $7 RETURNING *", 
    [updatePet.nombre, 
      updatePet,foto,
      updatePet.raza,
      updatePet.edad, 
      updatePet.tipo,
      updatePet.peso,
      id
    ])
  
  return res.json(result.rows[0]);
  next(error);
};

export const deletePet = async (req, res, next) =>{
  const id = req.params.id;
  const result = await pool.query("DELETE FROM mascotas WHERE idpet = $1 RETURNING *", [id]);
  res.json(result.rows[0]);
  next(error);
} ;
