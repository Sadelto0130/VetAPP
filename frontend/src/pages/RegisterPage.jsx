import {
  Input,
  Card,
  Button,
  ButtonWhite,
  Header,
  Label,
  Container
} from "../components/ui";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { registerUser, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await registerUser(data);

    if (user) {
      navigate("/profile");
    }
  });

  return (
    <Container
      className="h-[calc(100vh-7rem)] flex items-center justify-center relative"
    >
      <Card>
        <Header> CREAR USUARIO </Header>
        {registerErrors &&
          registerErrors.map((err) => (
            <p className="text-white text-center bg-red-500 rounded-md p-2">
              {err}
            </p>
          ))}
        <form onSubmit={onSubmit}>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            placeholder="Nombre"
            {...register("nombre", {
              required: true,
            })}
          />
          {errors.nombre && (
            <p className="text-red-500 text-right mt-0 mb-1">
              Nombre es obligatorio
            </p>
          )}

          <Label htmlFor="apellido">Apellido</Label>
          <Input
            placeholder="Apellido"
            {...register("apellido", {
              required: true,
            })}
          />
          {errors.apellido && (
            <p className="text-red-500 text-right mt-0 mb-1">
              Apellido es obligatorio
            </p>
          )}

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-right mt-0 mb-1">
              Email es obligatorio
            </p>
          )}

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-right mt-0 mb-1">
              Contraseña es obligatoria
            </p>
          )}

          <Button> CREAR USUARIO </Button>
        </form>
      </Card>
    </Container>
  );
}

export default RegisterPage;
