export const idPet = (req, res, next) => {
  if (req.session && req.session.idPet) {
    req.idPet = req.session.idPet; // guarda el idpet en la solicitud actual
  } else {
    return res
      .status(400) 
      .json({ message: "ID de mascota no encontrado en sesión" });
  }
  next();
}; 

