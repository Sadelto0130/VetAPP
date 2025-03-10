import { pool } from "../db.js";

export const getAllRegistro = async (req, res, next) => {
  const result = await pool.query("SELECT * FROM registro");
  return res.json({ 
    message: "Registros obtenidos", 
    registro: result.rows
  });
  next(error);
};

export const getRegistro = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM registro WHERE idRegistro = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createRegistro = async (req, res, next) => {
  const { fecha, procedimiento, procedimientoDescrip, idMascota, idveterinario } = req.body;
  const idDuenio = req.userId; 

  try {
    const existeMascota = await pool.query("SELECT * FROM mascotas WHERE id = $1", [idMascota])

    if(existeMascota.rowCount === 0){
      return res.status(400).json({
        message: "No existe la mascota"
      })
    }

    // db insert
    const result = await pool.query(
      "INSERT INTO registro (idMascota, idDuenio, fecha, idveterinario, procedimiento, procedimientoDescrip) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        idMascota,
        idDuenio,
        fecha,
        idveterinario,
        procedimiento,
        procedimientoDescrip,
      ]
    );

    res.send({
      message: "Registro Agregado",
      registro: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Ya existe el registro",
      });
    } 
    next(error);   
  }
};

export const updateRegistro = async (req, res, next) => {
  const id = req.params.id;
  const { fecha, procedimiento, procedimientoDescrip } =
    req.body;

  const datosOriginales = await pool.query(
    "SELECT * FROM registro WHERE idregistro = $1",
    [id]
  );

  if (datosOriginales.rowCount === 0) {
    return res.status(404).json({ message: "Registro no encontrado" });
  }

  const updateRegistro = {
    idVeterinario: datosOriginales.rows[0].id,
    fecha: fecha ?? datosOriginales.rows[0].fecha,
    procedimiento: procedimiento ?? datosOriginales.rows[0].procedimiento,
    procedimientoDescrip:
      procedimientoDescrip ?? datosOriginales.rows[0].procedimientoDescrip,
  };

  const result = await pool.query(
    "UPDATE registro SET idveterinario = $1, fecha = $2, procedimiento = $3, procedimientoDescrip = $4 WHERE id = $5 RETURNING *",
    [
      updateRegistro.idVeterinario,
      updateRegistro.fecha,
      updateRegistro.procedimiento,
      updateRegistro.procedimientoDescrip,
      id,
    ]
  );

  return res.json(result.rows[0]);
  next(error);
};
