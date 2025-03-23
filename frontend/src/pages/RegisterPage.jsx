import {
  Input,
  Card,
  Button,
  ButtonWhite,
  Header,
  Label,
} from "../components/ui";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { registerUser, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await registerUser(data);

    if(user){
      navigate("/profile");
    }
  });

  function handleClick() {
    navigate('/login')
  }

  return (
    <div
      className="h-screen flex items-center justify-center relative bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/vector-gratis/gente-jugando-sus-mascotas_52683-37895.jpg?t=st=1741679870~exp=1741683470~hmac=a07e95ae19c83c1cb56c0bbcd1502bf254eba79038975f49df9f5e7cce2c8760&w=1060')",
      }}
    >
      <Card>
        <Header> CREAR USUARIO </Header>
        {
          registerErrors && (
            registerErrors.map(err => (
              <p className="text-white text-center bg-red-500 rounded-md p-2">
                {err}
              </p>
            ))
          )
        }
        <form onSubmit={onSubmit}>         
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              placeholder="Nombre"
              {...register("nombre", {
                required: true,
              })}
            />
            {errors.nombre && <p className="text-red-500 text-right mt-0 mb-1">Nombre es obligatorio</p>}
                   
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              placeholder="Apellido"
              {...register("apellido", {
                required: true,
              })}
            />
            {errors.apellido && <p className="text-red-500 text-right mt-0 mb-1">Apellido es obligatorio</p>}
                 
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />  
            {errors.email && <p className="text-red-500 text-right mt-0 mb-1">Email es obligatorio</p>}        
         
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="text-red-500 text-right mt-0 mb-1">Contraseña es obligatoria</p>}
          
          <Button> CREAR USUARIO </Button>
        </form>

        <div className="flex items-center space-x-4">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400">O</div>
          <hr className="w-full border border-gray-300" />
        </div>

        <ButtonWhite onClick={handleClick}>INICIAR SESIÓN</ButtonWhite>
      </Card>
    </div>
  );
}

export default RegisterPage;
