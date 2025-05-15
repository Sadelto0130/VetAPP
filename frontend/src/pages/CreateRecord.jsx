import React, { useEffect, useState } from "react";
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
  const {
    createRegistro,
    loadRecord,
    updateRecordById,
    errors: petErrors,
  } = usePets();
  const param = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [petId, setPetId] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  let fecha_actualizado = new Date();
  let estado;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();
    let recordSend = {};

    if (!edit) {
      const payload = {
        procedimiento: data.procedimiento,
        procedimiento_descrip: data.procedimiento_descrip,
        estado: "Pendiente",
        id_veterinario: data.id_veterinario,
        id_duenio: String(user.idduenio),
        id_mascota: param.id,
      };
      try {
        recordSend = await createRegistro(payload);
      } catch (error) {
        console.error("Error al crear el registro:", error);
      } finally {
        setLoading(false);
        navigate(`/pet/${param.id}/records`);
      }
    } else {
      const payload = {
        procedimiento: data.procedimiento,
        procedimiento_descrip: data.procedimiento_descrip,
        estado: data.estado,
        id_veterinario: data.id_veterinario,
        id_duenio: user.idduenio,
        id_mascota: petId,
      };

      try {
        recordSend = await updateRecordById(param.id, payload);
      } catch (error) {
        console.error("Error al actualizar mascota:", error);
      } finally {
        setLoading(false);
        navigate(`/pet/${petId}/profile`);
      }
    }
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (location.pathname.includes("/edit_record/")) {
      setEdit(true);
      loadRecord(param.id).then((record) => {
        setPetId(record.id_mascota);
        setValue("procedimiento", record.procedimiento);
        setValue("procedimiento_descrip", record.procedimiento_descrip);
        setValue("estado", record.estado); // permitir modificar estado
        setValue("id_veterinario", record.id_veterinario);
      });
    }
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}
      <div className="flex items-center justify-center relative pt-20 ">
        <Card>
          <Header> {edit ? "EDITAR REGISTRO" : "CREAR REGISTRO"} </Header>

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
            <input type="hidden" {...register("id_veterinario")} />

            <Button>{edit ? "EDITAR REGISTRO" : "CREAR REGISTRO"}</Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default CreateRecord;
