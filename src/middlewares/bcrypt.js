const bcrypt = require('bcryptjs');

// Función para encriptar la contraseña
const encriptarContrasena = async (contrasena) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contrasena, salt);
  return hash;
};

// Middleware para encriptar la contraseña antes de guardarla
const encriptarContrasenaMiddleware = async (req, res, next) => {
  try {
    if (!req.body.contrasena) {
      return next();
    }
    const hash = await encriptarContrasena(req.body.contrasena);
    req.body.contrasena = hash;
    next();
  } catch (error) {
    res.status(500).json({mensaje: 'Error al encriptar la contraseña', error});
  }
};

module.exports = { encriptarContrasenaMiddleware };