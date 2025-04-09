import React from "react";
import {
  Button,
  Card,
  Container,
  Header,
  Input,
  Label,
} from "../components/ui";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePets } from "../context/PetContext";
import { useForm } from "react-hook-form";
import { set } from "zod";

function CreateRecord() {
  const { user } = useAuth();
  const { createRegistro, errors: petErrors } = usePets();
  const param = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    let record;

    const payload = {
      procedimiento: data.procedimiento,
      procedimiento_descrip: data.procedimiento_descrip,
      id_mascota: String(param.id),
      id_duenio: String(user.id),
      estado: "Pendiente",
    };

    try {
      const res = await createRegistro(payload);
      navigate( `/pet/${param.id}/records`);
      } catch (error) {
      console.error("Error al crear el registro:", error);
    }
  });

  return (
    <Container className="flex items-center justify-center relative pt-20 ">
      <Card>
        <Header> CREAR REGISTRO </Header>

        <form onSubmit={onSubmit}>
          <Label htmlFor="procedimiento">Procedimiento</Label>
          <Input
            placeholder="Procedimiento"
            {...register("procedimiento", {
              required: true,
            })}
          />

          <Label htmlFor="procedimiento_descrip">Descripción</Label>
          <textarea
            className="w-full h-32 border-2 border-gray-300 rounded-md p-2 mt-2"
            placeholder="Escribe una descripción..."
            {...register("procedimiento_descrip", {
              required: true,
            })}
          ></textarea>
          <Button>GUARDAR</Button>
        </form>
      </Card>
    </Container>
  );
}

export default CreateRecord;
