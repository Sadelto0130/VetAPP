  import { Card, Button } from "../ui/index";
  import { Link, useNavigate } from "react-router-dom";
  import { usePets } from "../../context/PetContext";
  import { calcularEdad } from "../../lib/funciones";

  function PetCard({ pet }) {
    const navigate = useNavigate();
    const { deletePets } = usePets(); 

    return (
      <div className="p-3 flex flex-col gap-4">
        <div className="relative flex flex-col shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm bg-white/90">
          {/* Delete */}
          <div className="relative z-40 flex items-center gap-2">
            <button
              className="text-blue-800 hover:text-blue-400 pr-3 pt-3 ml-auto"
              onClick={() => {
                if (
                  window.confirm(`¿Quiere eliminar a la mascota ${pet.nombre}?`)
                ) {
                  deletePets(pet.id);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 58.67"
                fill="#1f40af"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cls-1"
                      d="M61.33,5.33H48V2.67A2.66,2.66,0,0,0,45.33,0H18.67A2.66,2.66,0,0,0,16,2.67V5.33H2.67a2.67,2.67,0,0,0,0,5.34H8v40a8,8,0,0,0,8,8H48a8,8,0,0,0,8-8v-40h5.33a2.67,2.67,0,1,0,0-5.34ZM50.67,50.67A2.67,2.67,0,0,1,48,53.33H16a2.67,2.67,0,0,1-2.67-2.66v-40H50.67Z"
                    ></path>
                    <path
                      className="cls-1"
                      d="M24,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,24,45.33Z"
                    ></path>
                    <path
                      className="cls-1"
                      d="M40,45.33a2.67,2.67,0,0,0,2.67-2.66V21.33a2.67,2.67,0,0,0-5.34,0V42.67A2.67,2.67,0,0,0,40,45.33Z"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
          {/* card */}
          <Link to={`/pet/${pet.id}/profile`} className="z-20 absolute h-full w-full top-0 left-0 ">
            &nbsp;
          </Link>

          <div className="h-auto flex justify-center">
            <div className="h-44 w-44 relative flex items-center justify-center rounded-full m-2 bg-white shadow-md border-2 border-gray-300 overflow-hidden">
              <img
                src={pet.foto}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-white py-4 px-3">
            <h3 className="text-s mb-2 font-medium uppercase">{pet.nombre}</h3>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-xs text-gray-400">
                  Tipo de Mascota: {pet.tipo}
                </p>
                <p className="text-xs text-gray-400">Raza: {pet.raza}</p>
                <p className="text-xs text-gray-400">
                  Edad: {calcularEdad(pet.fecha_nacimiento)}
                </p>
              </div>
              <div className="relative z-40 flex items-center gap-2 ml-4">
                {/* registros*/}
                <button 
                  className="text-blue-800 hover:text-blue-500"
                  onClick={() => navigate(`/pet/${pet.id}/records`)}
                >
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                    width="25px"
                    height="25px"
                    viewBox="0 0 212.795 220.59"
                  >
                    <path
                      fill="#10003B"
                      d="M174.906,207.477H38.07c-3.603,0-6.531-2.93-6.531-6.53V30.579c0-3.601,2.929-6.53,6.531-6.53h25.826 c1.104,0,2,0.896,2,2V36.47c0,1.396,1.136,2.531,2.53,2.531h76.122c1.395,0,2.531-1.136,2.531-2.531V26.049c0-1.104,0.895-2,2-2 h25.826c3.602,0,6.531,2.93,6.531,6.53v170.367C181.438,204.547,178.508,207.477,174.906,207.477 M38.07,28.049 c-1.396,0-2.531,1.135-2.531,2.53v170.367c0,1.396,1.135,2.53,2.531,2.53h136.836c1.396,0,2.531-1.135,2.531-2.53V30.579 c0-1.396-1.136-2.53-2.531-2.53H151.08v8.421c0,3.602-2.931,6.531-6.531,6.531H68.427c-3.601,0-6.53-2.93-6.53-6.531v-8.421H38.07z"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M172.188,200.228h-131.4c-1.104,0-2-0.896-2-2V33.298c0-1.104,0.896-2,2-2h23.108c1.104,0,2,0.896,2,2v3.172 c0,1.396,1.136,2.531,2.53,2.531h76.121c1.396,0,2.532-1.136,2.532-2.531v-3.172c0-1.104,0.895-2,2-2h23.108c1.104,0,2,0.896,2,2 v164.93C174.188,199.332,173.292,200.228,172.188,200.228 M42.788,196.228h127.4V35.298H151.08v1.172 c0,3.602-2.93,6.531-6.532,6.531H68.427c-3.601,0-6.53-2.93-6.53-6.531v-1.172H42.788V196.228z"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M144.548,43.001H68.427c-3.601,0-6.53-2.929-6.53-6.531V15.627c0-3.601,2.93-6.531,6.53-6.531h76.121 c3.603,0,6.531,2.931,6.531,6.531V36.47C151.079,40.072,148.15,43.001,144.548,43.001 M68.427,13.096 c-1.396,0-2.53,1.136-2.53,2.531V36.47c0,1.396,1.135,2.531,2.53,2.531h76.121c1.396,0,2.531-1.135,2.531-2.531V15.627 c0-1.396-1.135-2.531-2.531-2.531H68.427z"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M57.402,106.133c-4.685,0-8.494-3.811-8.494-8.494c0-4.683,3.81-8.494,8.494-8.494 c4.684,0,8.494,3.812,8.494,8.494C65.896,102.322,62.086,106.133,57.402,106.133 M57.402,93.145c-2.479,0-4.494,2.017-4.494,4.494 c0,2.479,2.016,4.494,4.494,4.494s4.494-2.015,4.494-4.494C61.896,95.161,59.881,93.145,57.402,93.145"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M57.402,69.885c-4.685,0-8.494-3.811-8.494-8.494s3.81-8.495,8.494-8.495c4.684,0,8.494,3.812,8.494,8.495 S62.086,69.885,57.402,69.885 M57.402,56.896c-2.479,0-4.494,2.018-4.494,4.495c0,2.479,2.016,4.494,4.494,4.494 s4.494-2.015,4.494-4.494C61.896,58.913,59.881,56.896,57.402,56.896"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M57.402,142.381c-4.685,0-8.494-3.811-8.494-8.494c0-4.683,3.81-8.494,8.494-8.494 c4.684,0,8.494,3.812,8.494,8.494C65.896,138.57,62.086,142.381,57.402,142.381 M57.402,129.393c-2.479,0-4.494,2.017-4.494,4.494 c0,2.479,2.016,4.494,4.494,4.494s4.494-2.016,4.494-4.494C61.896,131.409,59.881,129.393,57.402,129.393"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M57.402,178.629c-4.685,0-8.494-3.811-8.494-8.494c0-4.683,3.81-8.494,8.494-8.494 c4.684,0,8.494,3.812,8.494,8.494C65.896,174.818,62.086,178.629,57.402,178.629 M57.402,165.641c-2.479,0-4.494,2.017-4.494,4.494 c0,2.479,2.016,4.494,4.494,4.494s4.494-2.015,4.494-4.494C61.896,167.657,59.881,165.641,57.402,165.641"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M158.142,63.391H72.959c-1.105,0-2-0.896-2-2c0-1.104,0.895-2,2-2h85.183c1.104,0,2,0.896,2,2	C160.142,62.495,159.245,63.391,158.142,63.391"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M158.142,99.639H72.959c-1.105,0-2-0.896-2-2c0-1.104,0.895-2,2-2h85.183c1.104,0,2,0.896,2,2	C160.142,98.743,159.245,99.639,158.142,99.639"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M158.142,135.887H72.959c-1.105,0-2-0.896-2-2c0-1.104,0.895-2,2-2h85.183c1.104,0,2,0.896,2,2 C160.142,134.991,159.245,135.887,158.142,135.887"
                    ></path>
                    <path
                      fill="#10003B"
                      d="M158.142,172.135H72.959c-1.105,0-2-0.896-2-2c0-1.104,0.895-2,2-2h85.183c1.104,0,2,0.896,2,2 C160.142,171.239,159.245,172.135,158.142,172.135"
                    ></path>
                  </svg>
                </button>
                {/* Edit */}
                <button
                  className="text-blue-800 hover:text-blue-500 "
                  onClick={() => navigate(`/pet/${pet.id}/edit_pet`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
                    ></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default PetCard;
