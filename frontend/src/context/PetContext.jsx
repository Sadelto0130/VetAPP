import { createContext, useContext, useState } from "react";
import {
  createPets,
  deletePet,
  getAllPetsDuenio,
  getPetById,
  updatePet,
  createRecords,
  loadRecordById,
  updateRecordPet,
  getRecord,
  inactiveRecord,
} from "../api/pets.api";

const PetContext = createContext();

export const usePets = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePets debe estar dentro del proveedor PetProvider");
  }
  return context;
};

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [errors, setErrors] = useState([]);
  const [records, setRecords] = useState([]);

  const createPetsFront = async (pet) => {
    try {
      const res = await createPets(pet);
      setPets((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.error(
        "Error en createPetsFront:",
        error.response?.data || error.message
      );
      throw error; // Para que el formulario lo atrape
    }
  };

  const loadPets = async () => {
    try {
      const res = await getAllPetsDuenio();
      setPets(res.data);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
      setErrors([error.response?.data?.message || error.message]);      
    }
  };

  const loadPetById = async (id) => {
    const res = await getPetById(id);
    return res.data;
  };

  const deletePets = async (id) => {
    const res = await deletePet(id);
    if (res.status === 200) {
      setPets(pets.filter((pet) => pet.id !== id));
    }
  };

  const updatePetById = async (id, pet, config) => {
    try {
      const res = await updatePet(id, pet, config);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || error.message]);
      console.error(error);
    }
  };

  const createRegistro = async (registro) => {
    const res = await createRecords(registro);
    setRecords([...records, res.data]);
    return res.data;
  };

  const loadRecord = async (id) => {
    const res = await getRecord(id);
    return res.data;
  };

  const loadRecordPet = async (id) => {
    const res = await loadRecordById(id);
    const registros = res.data?.registro || [];
    setRecords(res.registro);
    return Array.isArray(registros) ? registros : [];
  };

  const updateRecordById = async (id, record) => {
    try {
      const res = await updateRecordPet(id, record);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || error.message]);
      console.error(error);
    }
  };

  const inactiveRecordPet = async (id) => {
    try {
      const res = await inactiveRecord(id);
      return res.data;
    } catch (error) {
      setErrors([error.response?.data?.message || error.message]);
      console.error(error);
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        createPetsFront,
        loadPets,
        deletePets,
        loadPetById,
        updatePetById,
        createRegistro,
        loadRecordPet,
        loadRecord,
        updateRecordById,
        inactiveRecordPet,
        errors,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
