import {z} from 'zod'

export const crearRegistro = z.object({
  id_mascota: z.string({
    required_error: "ID mascota no enviado"
  }).min(1).max(255),
  id_duenio: z.string({
    required_error: "ID dueño no enviado"
  }).min(1).max(255),
  /* id_veterinario: z.string({
    required_error: "ID veterinario no enviado"
  }).min(1).max(255), */
  procedimiento: z.string({
    required_error: "Nombre del procedimiento es obligatorio",
    invalid_type_error: "Debe ser un texto"
  }).min(4).max(255),
  procedimiento_descrip: z.string({
    required_error: "Descripcion del procedimiento es obligatorio",
    invalid_type_error: "Debe ser un texto"
  }).min(4).max(255),
})

export const actualizarRegistro = z.object({
  procedimiento: z.string({
    required_error: "Nombre del procedimiento es obligatorio",
    invalid_type_error: "Debe ser un texto"
  }).min(4).max(255).optional(),
  procedimiento_Descrip: z.string({
    required_error: "Descripcion del procedimiento es obligatorio",
    invalid_type_error: "Debe ser un texto"
  }).min(4).max(255).optional(),
})


