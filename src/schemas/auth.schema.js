import {z} from 'zod' 

export const registrarseSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre es obligatorio',
    invalid_type_error: 'El nombre debe ser un texto'
  }),
  apellido: z.string({
    required_error: 'El apellido es obligatorio',
    invalid_type_error: 'El apellido debe ser un texto'
  }),
  email: z.string({
    required_error: 'El email es obligatorio'
  }).email({
    message: 'El email debe ser un email valido'
  }),
  password: z.string({
    required_error: 'El password es obligatorio',
    invalid_type_error: 'El password debe ser un texto'
  }).min(6, {
    message: "La constraseña debe tener 6 caracteres minimo"
  }).max(10, {
    message: "La constraseña debe tener 10 caracteres maximo"
  })
})

export const signinSchema = z.object({
  email: z.string({
    required_error: 'El email es obligatorio',
    invalid_type_error: 'El email debe ser un texto'
  }).email({
    message: 'El email debe ser un email valido'
  }),
  password: z.string({
    required_error: 'El password es obligatorio',
    invalid_type_error: 'El password debe ser un texto'
  }).min(6, {
    message: "La constraseña debe tener 6 caracteres minimo"
  }).max(10, {
    message: "La constraseña debe tener 10 caracteres maximo"
  }),
})