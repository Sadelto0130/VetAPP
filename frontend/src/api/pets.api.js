import client from "./axios.js"

export const createPets = (pet) => client.post("/add_pet", pet) 

export const getAllPetsDuenio = () => client.get("/get_pets", {withCredentials: true}) 

export const deletePet = (id) => client.delete(`/delete_pet/${id}`)

export const getPetById = (id) => client.get(`/get_pet/${id}`) 

export const updatePet = (id, pet, config) => client.put(`/update_pet/${id}`, pet, config)

export const createRecords = (record) => client.post("/crear_registro", record)

export const loadRecordById = (id) => client.get(`/registros_mascota/${id}`)

export const updateRecordPet = (id, record) => client.put(`/actualizar_registro/${id}`, record)

export const getRecord = (id) => client.get(`/registro/${id}`)  

export const inactiveRecord = (id) => client.put(`/borrar_registro/${id}`) 

