import pg from 'pg'

export const pool = new pg.Pool({
  port: 5432,
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'veterinaria'
})

pool.on('connect', () => {
  console.log('Conectado a la Base de Datos')
})