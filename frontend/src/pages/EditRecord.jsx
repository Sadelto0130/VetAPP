import {
  Card,
  Container,
  Input,
  Header,
  Button,
  Label,
  Select,
} from "../components/ui";
import { useForm } from "react-hook-form";
import { usePets } from "../context/PetContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function EditRecord() {
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    console.log("pathname actual:", location.pathname);
    if (location.pathname.includes("edit_record")) {
      console.log("edit");
    }
  }, [location.pathname]);

  return (
    <Container className="flex items-center justify-center relative pt-20 ">
      {console.log(location.pathname)}
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

export default EditRecord