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

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { sign, errors } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await sign(data);

    if (user) {
      navigate("/profile");
    }
  });

  return (
    <Container
      className="h-[calc(100vh-7rem)] flex items-center justify-center relative bg-center bg-no-repeat"
    >
      <Card>
        <Header> INICIAR SESIÓN </Header>
        {errors &&
          errors.map((err, index) => (
            <p key={index} className="text-white text-center bg-red-500 rounded-md p-2">
              {err}
            </p>
          ))}
        <form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true })}
            />
          </div>

          <Button> INICIAR SESIÓN </Button>
        </form>
      </Card>
    </Container>
  );
}

export default LoginPage;
