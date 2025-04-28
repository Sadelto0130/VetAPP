import { pets_types } from "../pets_types/pets_types"; //tipos de mascotas
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
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function FormMascota() {
  const {
    createPets,
    loadPetById,
    updatePetById,
    errors: petErrors,
  } = usePets();
  const [loading, setLoading] = useState(false); 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const formData = new FormData();
    let pet;

    if (!params.id) {
      formData.append("nombre", data.nombre);
      formData.append("raza", data.raza);
      formData.append("edad", data.edad);
      formData.append("tipo", data.tipo);
      formData.append("peso", data.peso);
      formData.append("fecha_nacimiento", data.fecha_nacimiento);

      // Validar que haya archivo o Si el usuario cargó una nueva foto, la añadimos
      if (data.foto && data.foto.length > 0) {
        formData.append("foto", data.foto[0]);
      }
      try {
        pet = await createPets(formData);
      } catch (error) {
        console.error("Error al agregar la mascota:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Llenar FormData también para la edición
      formData.append("nombre", data.nombre);
      formData.append("raza", data.raza);
      formData.append("edad", data.edad);
      formData.append("tipo", data.tipo);
      formData.append("peso", data.peso);
      formData.append("fecha_nacimiento", data.fecha_nacimiento);

      if (data.foto && data.foto.length > 0) {
        formData.append("foto", data.foto[0]); // Si se seleccionó nueva imagen
      }
      try {
        pet = await updatePetById(params.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error al actualizar mascota:", error);
      } finally {
        setLoading(false);
      }
    }

    if (pet) {
      navigate("/pets");
    }
  });

  useEffect(() => {
    if (params.id) {
      loadPetById(params.id).then((pet) => {
        const fecha = new Date(pet.fecha_nacimiento);
        const formatoInputDate = fecha.toISOString().split("T")[0]; // yyyy-mm-dd

        setValue("nombre", pet.nombre);
        setValue("raza", pet.raza);
        setValue("tipo", pet.tipo);
        setValue("peso", pet.peso);
        setValue("fecha_nacimiento", formatoInputDate);
      });
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}

      <Container        
        className="h-[calc(100vh-3rem)] flex items-center justify-center relative mt-10"
      >
        <Card>
          <Header> {params.id ? "EDITAR MASCOTA" : "AGREGAR MASCOTA"} </Header>
          {petErrors &&
            petErrors.map((err, index) => (
              <p key={index} className="text-white text-center bg-red-500 rounded-md p-2">
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

            <Label htmlFor="Raza">Raza</Label>
            <Input
              placeholder="Raza"
              {...register("raza", {
                required: true,
              })}
            />
            {errors.raza && (
              <p className="text-red-500 text-right mt-0 mb-1">
                La raza es obligatoria
              </p>
            )}

            <Label htmlFor="Fecha nacimiento">Fecha de Nacimiento</Label>
            <Input
              type="date"
              placeholder="Fecha de nacimiento"
              {...register("fecha_nacimiento", { required: true })}
            />
            {errors.edad && (
              <p className="text-red-500 text-right mt-0 mb-1">
                La edaad es obligatoria
              </p>
            )}

            <Label htmlFor="Peso">Peso</Label>
            <Input
              placeholder="Peso"
              {...register("peso", {
                required: true,
              })}
            />
            {errors.peso && (
              <p className="text-red-500 text-right mt-0 mb-1">
                El peso es obligatoria
              </p>
            )}

            <Label htmlFor="Tipo mascota">Tipo de Mascota</Label>
            <Select
              {...register("tipo", { required: true })}
              defaultValue="value1"
            >
              {pets_types.map((pet) => (
                <option key={pet.tipo} value={pet.tipo}>
                  {pet.tipo}
                </option>
              ))}
            </Select>
            {errors.tipo && (
              <p className="text-red-500 text-right mt-0 mb-1">
                Tipo de mascota es obligatorio
              </p>
            )}

            <Label htmlFor="Imagen ">Foto de la Mascota</Label>
            <Input
              type="file"
              accept="image/"
              placeholder="Foto de la Mascota"
              {...register("foto")}
            />

            <Button> {params.id ? "EDITAR MASCOTA" : "AGREGAR MASCOTA"}</Button>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default FormMascota;
