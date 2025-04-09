import { Card, Container, Input } from "../components/ui";
import { usePets } from "../context/PetContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Registros() {
  const { user, getUserRecords, registros } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const registros = async() =>{
      if (user !== null) {
        await getUserRecords();
        setLoading(false)
      }
      if (!user) {
        navigate("/login");
      }
    }
    registros()
  }, [user]);

  return (
    <>
    {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}
      <Container className="absolute w-full bg-white/80">
      <div
        className={`${
          registros.length === 1
            ? "flex justify-center items-center"
            : "flex flex-wrap gap-6 justify-center pt-6"
        }`}
      >
        {registros.map((registro) => (           
          <Card key={registro.registro_id}>
            {console.log(`Registro id: ${registro.registro_id}`)    } 
            <div className="flex items-center justify-between gap-4 mb-2">
              <img
                src={registro.foto}
                alt={registro.nombre}
                className="relative inline-block object-cover object-center w-12 h-12 rounded-full"
              />
              <span>
                {new Date(registro.fecha_creacion).toLocaleDateString()}
              </span>
            </div>
            <h6 className="flex items-center gap-2 mb-2 font-sans text-base antialiased font-medium leading-relaxed tracking-normal text-blue-gray-900">
              <span>{registro.nombre}</span>
            </h6>
            <div>
              <h6 className="text-xm font-semibold">{registro.procedimiento}</h6>
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                {registro.procedimiento_descrip}
              </p>
            </div>

            <div className="flex items-center gap-8 pt-4 mt-6 border-t border-blue-gray-50">
              <button
                className="select-none rounded-lg bg-gray-900 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {navigate(`/pet/edit_record/${registro.registro_id}`)}}
              >
                Editar
              </button>
              <button
                className="select-none rounded-lg bg-red-900 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Borrar
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Container>
    </>
    
  );
}

export default Registros;
