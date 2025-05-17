import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePets } from "../context/PetContext";
import { Container } from "../components/ui";
import { calcularEdad } from "../lib/funciones";

function ProfilePage() {
  const { user, registros, errors, getUserRecords } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const profile = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        await getUserRecords();
      } catch (error) {
        console.error("Error al obtener registros", error);
      } finally {
        setLoading(false);
      }
    };
    profile();
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white">
            Loading...
          </div>
        </div>
      ) : (
        <>
          {
            <div className="items-center justify-center relative pt-20 ">
              <div className="bg-white/80 relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto pb-6 pl-2 pr-2">
                <div className="flex justify-center">
                  <img
                    src={user.gravatar}
                    alt=""
                    className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                  />
                </div>

                <div className="mt-16">
                  <h1 className="font-bold text-center text-3xl text-gray-900 uppercase">
                    {user.nombre} {user.apellido}
                  </h1>

                  <div className="my-5 px-6">
                    <Link
                      to="/pets"
                      className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-3 py-3 bg-gray-900 hover:bg-black hover:text-white text-xl"
                    >
                      MASCOTAS
                    </Link>
                  </div>

                  <div className="flex justify-between items-center my-5 px-6">
                    <Link
                      to="/pet/records"
                      className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3"
                    >
                      Registros
                    </Link>
                  </div>

                  <div className="px-4 sm:px-6">
                    <h3 className="font-medium text-gray-900 text-left pb-2 text-lg sm:text-xl">
                      REGISTROS RECIENTES
                    </h3>
                    {registros.length === 0 ? (
                      <p className="text-gray-600 text-center mt-4 text-lg">
                        No tienes registros de mascotas
                      </p>
                    ) : (
                      registros.slice(0, 5).map((registro) => (
                        <Link
                          to=""
                          key={registro.registro_id}
                          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-3 hover:shadow-md transition-shadow duration-200 block"
                        >
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
                            <div className="md:pr-4">
                              <h4 className="font-bold text-gray-900 text-base sm:text-lg uppercase">
                                {registro.nombre}:
                                <span className="text-gray-800 pl-1 text-sm font-light">
                                  {registro.tipo} -
                                </span>
                                <span className="text-gray-800 pl-1 text-sm font-light">
                                  RAZA {registro.raza}
                                </span>
                              </h4>
                              <p className="text-gray-600 text-sm mt-1 uppercase line-clamp-1">
                                {registro.procedimiento} -
                                <span className="text-gray-800 pl-1 text-xs font-light">
                                  {registro.procedimiento_descrip}
                                </span>
                              </p>
                              <p className="text-gray-600 text-xs mt-1 uppercase">
                                FECHA REGISTRO:
                                <span className="text-sm text-gray-600 pl-1">
                                  {new Date(
                                    registro.fecha_creacion
                                  ).toLocaleDateString()}
                                </span>
                              </p>
                            </div>
                            <span className="text-sm text-gray-400 md:text-right md:whitespace-nowrap">
                              EDAD: {calcularEdad(registro.fecha_nacimiento)}
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </>
  );
}

export default ProfilePage;
