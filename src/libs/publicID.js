// Función para extraer el public_id de la URL de Cloudinary
export const obtenerPublicId = (url) => {
  const parts = url.split("/");
  return parts.slice(-2).join("/").split(".")[0]; // Extrae el ID sin la extensión
};