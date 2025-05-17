import pg from 'pg'
import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from './config.js'

export const pool = new pg.Pool({
  port: PG_PORT,
  host: PG_HOST,
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  max: 20,                // Máximo número de conexiones simultáneas en el pool
  idleTimeoutMillis: 30000,  // Tiempo (ms) que una conexión puede estar inactiva antes de cerrarse
  connectionTimeoutMillis: 2000,  // Tiempo máximo para establecer conexión
  ssl: {
    rejectUnauthorized: false  // Importante si usas conexión SSL, típico en servicios como Railway o Heroku
  }
})

pool.on('connect', () => {
  console.log('Conectado a la Base de Datos')
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})