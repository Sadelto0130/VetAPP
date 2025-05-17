import { usePets } from "../context/PetContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../components/ui";
import Table from "../components/Table";

function PetProfile() {
  const { loadPetById, loadRecordPet} = usePets();
  const params = useParams();
  const [petData, setPetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([])

  useEffect(() => {
    const pet = async () => {
      try {
        const data = await loadPetById(params.id);
        setPetData(data);
      } catch (error) {
        console.log(error);
        setPetData(null);
      } finally {
        setLoading(false);
      }
    };
    pet();
  }, [params.id, loadPetById]);

  useEffect(() => {
    const petRecords = async () => {
      try {
        const data = await loadRecordPet(params.id);
        setRecords(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };
    petRecords();
  }, [params.id, loadRecordPet]);

  if (loading || !petData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 max-w-full overflow-hidden h-auto md:h-[calc(100vh-7rem)]">
          {/* Panel lateral fijo (solo en md+) */}
          <div className="w-full md:w-1/4 md:sticky md:top-0 md:h-screen overflow-hidden">
            <div className="bg-white p-4 border-t-4 border-blue-400 h-full flex flex-col">
              <div className="mb-3">
                <img
                  src={petData.foto}
                  alt={petData.nombre?.toUpperCase()}
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
                <Table dataTable={records}/>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PetProfile;
