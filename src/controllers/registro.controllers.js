import { pool } from "../db.js";

export const getAllRegistro = (req, res) => res.send("Registros de actividad");

export const getRegistro = (req, res) => res.send("Registro de actividad");

export const createRegistro = async (req, res, next) => {
  try {
    // db insert
    const result = await pool.query(
      "INSERT INTO registro (idMascota, idDuenio, idVeterinario, fecha, procedimiento, procedimientoDescrip) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        idMascota,
        idDuenio,
        idVeterinario,
        fecha,
        procedimiento,
        procedimientoDescrip,
      ]
    );

    console.log(result.rows[0]);
    res.send("Agregando registro de actividad");
  } catch (error) {
    if(error.code === '23505'){
      return res.send('Ya existe el registro');
    }
    next(error);
  }
  const {
    idMascota,
    idDuenio,
    idVeterinario,
    fecha,
    procedimiento,
    procedimientoDescrip,
  } = req.body;
};

export const updateRegistro = (req, res) =>
  res.send("Actualizar registro de actividad");
