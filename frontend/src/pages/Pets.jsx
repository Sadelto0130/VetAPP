import {useEffect, useState} from "react";
import { Card, Container } from "../components/ui";
import { Link } from "react-router-dom";
import PetCard from "../components/pets/PetCard";
import { usePets } from "../context/PetContext";

function Pets() {
  const {pets, loadPets} = usePets();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pets = async() =>{
      try {
        await loadPets()
        setLoading(false)
      } catch (error) {
        console.log("Error al cargar mascotas: " + error)
      }
    }   
    pets()
  },[])
  
  return (
    <>
    {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}
      <Container className="relative z-10">
        <Link
          to="/pet/add_pet"
          className="w-full text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white text-xl mb-8"
        >
          AGREGAR MASCOTA
        </Link>
        <div
          className={`grid gap-8 ${ 
            pets.length === 1
              ? "grid-cols-1 place-items-center"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {pets.map((pet, index) => (
            <PetCard pet={pet} key={pet.id} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Pets;
