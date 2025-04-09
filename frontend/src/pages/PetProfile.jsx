import { usePets } from "../context/PetContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../components/ui";
import Table from "../components/Table";

function PetProfile() {
  const { loadPetById } = usePets();
  const params = useParams();
  const [petData, setPetData] = useState({});
  const [loading, setLoading] = useState(true);

  const dataTable = [
    { id: 1, nombre: "Firulais", especie: "Perro", edad: 4 },
    { id: 2, nombre: "Michi", especie: "Gato", edad: 2 },
    { id: 3, nombre: "Lola", especie: "Conejo", edad: 1 },
    { id: 4, nombre: "Toby", especie: "Perro", edad: 5 },
    { id: 5, nombre: "Nala", especie: "Gato", edad: 3 },
    { id: 6, nombre: "Rocky", especie: "Perro", edad: 6 },
    { id: 7, nombre: "Pelusa", especie: "Gato", edad: 2 },
    { id: 8, nombre: "Tom", especie: "Gato", edad: 4 },
    { id: 9, nombre: "Jerry", especie: "Ratón", edad: 1 },
    { id: 10, nombre: "Simba", especie: "León", edad: 3 },
    { id: 11, nombre: "Max", especie: "Perro", edad: 4 },
    { id: 12, nombre: "Bella", especie: "Conejo", edad: 2 },
    { id: 13, nombre: "Chispa", especie: "Hámster", edad: 1 },
    { id: 14, nombre: "Luna", especie: "Gato", edad: 5 },
    { id: 15, nombre: "Thor", especie: "Perro", edad: 7 },
    { id: 16, nombre: "Kira", especie: "Gato", edad: 3 },
    { id: 17, nombre: "Nube", especie: "Conejo", edad: 2 },
    { id: 18, nombre: "Zeus", especie: "Perro", edad: 6 },
    { id: 19, nombre: "Chiqui", especie: "Gato", edad: 1 },
    { id: 20, nombre: "Fiona", especie: "Perro", edad: 3 },
    { id: 21, nombre: "Copito", especie: "Conejo", edad: 2 },
    { id: 22, nombre: "Coco", especie: "Gato", edad: 4 },
    { id: 23, nombre: "Daisy", especie: "Perro", edad: 5 },
    { id: 24, nombre: "Rex", especie: "Perro", edad: 6 },
    { id: 25, nombre: "Snow", especie: "Conejo", edad: 1 },
    { id: 26, nombre: "Zoe", especie: "Gato", edad: 3 },
    { id: 27, nombre: "Sasha", especie: "Perro", edad: 4 },
    { id: 28, nombre: "Leo", especie: "Gato", edad: 2 },
    { id: 29, nombre: "Tita", especie: "Conejo", edad: 3 },
    { id: 30, nombre: "Dobby", especie: "Perro", edad: 2 },
    { id: 31, nombre: "Gizmo", especie: "Gato", edad: 5 },
    { id: 32, nombre: "Tina", especie: "Conejo", edad: 1 },
    { id: 33, nombre: "Bruno", especie: "Perro", edad: 4 },
    { id: 34, nombre: "Lili", especie: "Gato", edad: 2 },
    { id: 35, nombre: "Manchas", especie: "Perro", edad: 6 },
    { id: 36, nombre: "Whiskers", especie: "Gato", edad: 3 },
    { id: 37, nombre: "Pipo", especie: "Conejo", edad: 2 },
    { id: 38, nombre: "Kiwi", especie: "Gato", edad: 1 },
    { id: 39, nombre: "Tango", especie: "Perro", edad: 3 },
    { id: 40, nombre: "Milo", especie: "Gato", edad: 4 },
    { id: 41, nombre: "Fideo", especie: "Perro", edad: 2 },
    { id: 42, nombre: "Maya", especie: "Gato", edad: 5 },
    { id: 43, nombre: "Panda", especie: "Conejo", edad: 1 },
    { id: 44, nombre: "Blue", especie: "Perro", edad: 4 },
    { id: 45, nombre: "Maple", especie: "Gato", edad: 3 },
    { id: 46, nombre: "Lolo", especie: "Conejo", edad: 2 },
    { id: 47, nombre: "Cleo", especie: "Perro", edad: 5 },
    { id: 48, nombre: "Felix", especie: "Gato", edad: 2 },
    { id: 49, nombre: "Tobi", especie: "Perro", edad: 4 },
    { id: 50, nombre: "Canelita", especie: "Gato", edad: 3 }
  ];
  

  useEffect(() => {
    const pet = async () => {
      try {
        const data = await loadPetById(params.id);
        setPetData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    pet();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row max-w-full overflow-hidden h-auto md:h-[calc(100vh-7rem)]">
          {/* Panel lateral fijo (solo en md+) */}
          <div className="w-full md:w-1/4 md:sticky md:top-0 md:h-screen overflow-hidden">
            <div className="bg-white p-4 border-t-4 border-blue-400 h-full flex flex-col">
              <div className="mb-3">
                <img
                  src={petData.foto}
                  alt={petData.nombre.toUpperCase()}
                  className="w-full max-h-[450px] object-cover rounded  "
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl text-center break-words">
                {petData.nombre}
              </h1>
              <ul className="bg-gray-100 text-gray-600 mt-4 divide-y rounded shadow-sm text-sm uppercase">
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 px-3 gap-1">
                  <span>Estado</span>
                  <span
                    className={`py-1 px-2 rounded text-white ${
                      petData.estado ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {petData.estado ? "Activo" : "Inactivo"}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 px-3 gap-1">
                  <span>Fecha de Nacimiento</span>
                  <span>
                    {new Date(petData.fecha_nacimiento).toLocaleDateString()}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 px-3 gap-1">
                  <span>Peso</span>
                  <span>
                    {petData.peso} Kg
                  </span>
                </li>
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 px-3 gap-1">
                  <span>Tipo Mascota</span>
                  <span>
                    {petData.tipo}
                  </span>
                </li>
                <li className="flex flex-col md:flex-row justify-between items-start md:items-center py-3 px-3 gap-1">
                  <span>Raza</span>
                  <span>
                    {petData.raza}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contenido con scroll interno solo para registros */}
          <div className="w-full md:w-3/4 h-auto md:h-screen overflow-y-auto px-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Registros</h2>
              <div className="min-w-full table-auto">
                {/**<PetCard pet={pet} key={pet.id} /> */}
                <Table dataTable={dataTable}/>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PetProfile;
