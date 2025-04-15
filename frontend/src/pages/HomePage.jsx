import { useAuth } from "../context/AuthContext";
import imagen from "../../public/pet-removebg-preview.png";
import { Container } from "../components/ui";

function HomePAges() {
  const data = useAuth();
  return (
    <Container        
        className="h-[calc(100vh-10rem)] flex items-center justify-center relative mt-10"
      >
    <div
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/vector-gratis/dibujos-animados-perros_24640-47234.jpg?t=st=1744596703~exp=1744600303~hmac=a45951b76ccde46aca2403bad1250cfd36d90ab32e9e493ac474732b8625b852&w=996')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          filter: "blur(2px) brightness(1)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-md"></div>
      </div>
      <main className="relative font-abhaya-libre h-full overflow-hidden">
        {/* Imagen de fondo con superposición suave */}
        <div className="absolute inset-0 z-0"></div>

        {/* Contenido principal */}
        <div className="relative z-10 container mx-auto px-6 sm:px-12 flex flex-col-reverse md:flex-row items-center py-16 md:py-24">
          {/* Texto principal */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-blue-900">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight drop-shadow-md">
              Bienestar para tus mascotas
            </h1>
            <h2 className="text-xl sm:text-2xl text-blue-800 font-semibold mt-2 mb-4">
              Aplicacion de Control para Mascotas
            </h2>
            <p className="text-gray-800 text-base sm:text-lg font-alegraya-sans leading-relaxed tracking-wide">
              Cuidamos la salud de tus compañeros peludos con amor,
              profesionalismo y dedicación. Consultas, vacunas, controles y más.
            </p>

            <div className="flex gap-4 mt-8 sm:mt-12 flex-wrap">
              {/*  <a
            href="#"
            className="inline-block bg-green-900 hover:bg-green-800 text-white text-sm sm:text-base uppercase py-3 px-6 sm:py-4 sm:px-8 rounded-full shadow-lg transition-all duration-300"
          >
            Reservar turno
          </a>
          <a
            href="#"
            className="inline-block border-2 border-green-900 text-green-900 hover:bg-green-100 text-sm sm:text-base uppercase py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300"
          >
            Conocé más
          </a> */}
            </div>
          </div>

          {/* Imagen decorativa */}
          <div className="w-full md:w-1/2 flex justify-center items-center mb-12 md:mb-0">
            <img src={imagen} className="w-5/6 max-w-md drop-shadow-xl" />
          </div>
        </div>
      </main>
    </Container>
  );
}

export default HomePAges;
