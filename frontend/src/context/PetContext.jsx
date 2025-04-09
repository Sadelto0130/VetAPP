import { createContext, useContext, useState } from "react";
import {
  createPets,
  deletePet,
  getAllPetsDuenio,
  getPetById,
  updatePet,
  createRecords,
  loadRecordById
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

  const createPets = async (pet) => {
    const res = await createPets(pet);
    setPets([...pets, res.data]);
  };

  const loadPets = async () => {
    const res = await getAllPetsDuenio();
    setPets(res.data);
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
      setErrors([error.response?.data?.message || console.error(error)]);
    }
  };

  const createRegistro = async (registro) => {
    const res = await createRecords(registro);
    setRecords([...records, res.data]);
    return res.data;
  };

  const loadRecordPet = async (id) => { 
    const res = await loadRecordById(id);
    return Array.isArray(res.data.registro) ? res.data.registro : [];
  };

  return (
    <PetContext.Provider
      value={{
        pets, 
        createPets,
        loadPets,
        deletePets,
        loadPetById,
        updatePetById,
        createRegistro,
        loadRecordPet,
        errors,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
