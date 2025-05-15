import { useEffect, useState } from "react";
import { usePets } from "../context/PetContext";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "../components/ui";

function PetRecord() {
  const { loadPetById, loadRecordPet } = usePets();
  const [pet, setPet] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDataPet = async () => {
      try {
        const dataPet = await loadPetById(params.id);

        if (!dataPet || Object.keys(dataPet).length === 0) {
          navigate("/pets");
          return;
        }
        setPet(dataPet);
      } catch (error) {
        console.error("Error cargando datos de la mascota:", error);
        navigate("/pets");
      } finally {
        setLoading(false);
      }
    };
    getDataPet();
  }, [params.id, loadPetById, navigate]); 

  useEffect(() => {
    const getDataRecord = async () => {
      try {
        const dataRecord = await loadRecordPet(params.id);

        if (!dataRecord || !Array.isArray(dataRecord)) {
          console.warn("Registros vacíos o inválidos");
          setRecords([]);
          return; 
        }
        setRecords(dataRecord);
      } catch (error) {
        console.error("Error cargando datos de los registros:", error);
        navigate("/pets");
      } finally {
        setLoading(false);
      }
    };
    getDataRecord();
  }, [params.id, loadRecordPet, navigate]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Container className="h-[calc(100vh)] items-center justify-center relative pt-20 mb-8">
          <div>
            <div className="bg-white/80 relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
              <div className="flex justify-center pb-3">
                <img
                  src={pet?.foto || "/img/default_pet.png"}
                  alt=""
                  className="rounded-full mx-auto absolute -top-20 w-52 h-52 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                />
              </div>

              <div className="mt-32 pb-2">
                <h1 className="font-bold text-center text-3xl text-gray-900 uppercase">
                  {pet.nombre}
                </h1>
                <p>
                  <span></span>
                </p>
                <div className="my-5 px-6">
                  <Link
                    to={`/pet/${pet.id}/create_record`}
                    className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white text-xl"
                  >
                    CREAR REGISTRO
                  </Link>
                </div>
                {/* <div className="flex justify-between items-center my-5 px-6">
                  <a
                    href=""
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Veterinarias
                  </a>
                  <Link
                    to="/pet/registros"
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Registros
                  </Link>
                  <a
                    href=""
                    className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                  >
                    Citas
                  </a>
                </div> */}

                <div className="px-6 mt-3">
                  <h3 className="font-semibold text-xl text-gray-900 mb-4">
                    Registros Recientes
                  </h3>

                  {records.slice(0, 5).map((record) => (
                    <Link
                    to="/pets"
                    key={record.id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-2 mb-2 hover:shadow-md transition-shadow duration-200 block"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg uppercase">
                          {record.procedimiento} 
                        </h4>
                        <p className="text-gray-600 text-xs mt-1 uppercase">
                          {record.procedimiento_descrip}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(record.fecha_creacion).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default PetRecord;
