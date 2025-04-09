export const calcularEdad = (fechaString) => {
  const fechaNacimiento = new Date(fechaString);
  const hoy = new Date();
  let edadAnios = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let edadMeses = hoy.getMonth() - fechaNacimiento.getMonth();

  if (edadMeses < 0) {
    edadAnios--;
    edadMeses += 12;
  }

  if (edadAnios > 0) {
    return `${edadAnios} año${edadAnios > 1 ? "s" : ""}`;
  } else {
    return `${edadMeses} mes${edadMeses > 1 ? "es" : ""}`;
  }
}; 