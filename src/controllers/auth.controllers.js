import bcrypt from 'bcrypt'
import { pool } from '../db.js'
import {createAcessToken} from '../libs/jwt.js'

export const signin = (req, res) => res.send('Ingresando a la pagina');

export const signup = async (req, res) => {
  const {nombre, apellido, email, pass, tipousuario} = req.body;

  try {
    const hashedPass = await bcrypt.hash(pass, 10);
    
    const result = await pool.query(
      'INSERT INTO users(nombre, apellido, email, pass, tipousuario) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellido, email, hashedPass, tipousuario]
    ); 

    const token = await createAcessToken({
      id: result.rows[0].idduenio,
      nombre: result.rows[0].nombre,
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSit: 'none',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    // devuelve el usuario sin la contraseña
    const user = {...result.rows[0]}
    delete user.pass;
    return res.json(user);

  } catch (error) {
    if (error.code === '23505'){
      return res.status(400).json({
        message: 'El correo ya esta en uso'
      });
    }
  }
};

export const logout = (req, res) => res.send('Cerrando sesion');

export const profile = (req, res) => res.send('Perfil de usuario');

export const all_profile = (req, res) => res.send('Todos los perfiles de usuario');