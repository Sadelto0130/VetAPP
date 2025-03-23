import {Link} from "react-router-dom";

export function NotFound() {
  return (
    <div className="h-screen w-screen bg-[#b5cfea] flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            No se encontro la pagina.{" "}
          </p>
          <p className="mb-8">
            Puedes encontrar otras cosas de interes en nuestra web.
          </p>

          <Link to="/" className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
            Volver al Inicio
          </Link>
        </div>

        <div
          className="w-full md:w-1/2 h-64 md:h-96 bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/vector-gratis/personaje-zorro-dibujos-animados-triste-cansado-sentado-oficina_74855-16924.jpg?t=st=1741714441~exp=1741718041~hmac=704b4621fa5cde330d672f5bec6b12443f67e267c378af84ac4878dbaf6b73db&w=996')",
          }}
        ></div>
      </div>
    </div>
  );
}

export default NotFound;
