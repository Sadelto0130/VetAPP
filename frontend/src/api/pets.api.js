import axios from "./axios"; 

export const createPets = (pet) => axios.post("/add_pet", pet)

export const getAllPetsDuenio = () => axios.get("/get_pets")

export const deletePet = (id) => axios.delete(`/delete_pet/${id}`)

export const getPetById = (id) => axios.get(`/get_pet/${id}`) 

export const updatePet = (id, pet, config) => axios.put(`/update_pet/${id}`, pet, config)

export const createRecords = (record) => axios.post("/crear_registro", record)

export const loadRecordById = (id) => axios.get(`/registros_mascota/${id}`)