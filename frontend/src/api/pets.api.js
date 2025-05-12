import axios from "./axios"; 

export const createPets = (pet) => axios.post("/add_pet", pet)

export const getAllPetsDuenio = () => axios.get("/get_pets", {withCredentials: true})

export const deletePet = (id) => axios.delete(`/delete_pet/${id}`)

export const getPetById = (id) => axios.get(`/get_pet/${id}`) 

export const updatePet = (id, pet, config) => axios.put(`/update_pet/${id}`, pet, config)

export const createRecords = (record) => axios.post("/crear_registro", record)

export const loadRecordById = (id) => axios.get(`/registros_mascota/${id}`)

export const updateRecordPet = (id, record) => axios.put(`/actualizar_registro/${id}`, record)

export const getRecord = (id) => axios.get(`/registro/${id}`)  

export const inactiveRecord = (id) => axios.put(`/borrar_registro/${id}`) 