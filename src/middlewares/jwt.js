const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Función para firmar un token JWT
const tokenSign = (usuario) => {
  const token = jwt.sign(usuario, process.env.JWT_SECRET, {
    expiresIn: '1h', // Tiempo de expiración del token
  });
  return token;
};

// Middleware para verificar el token en las rutas protegidas
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    req.usuario = decodedToken;
    next();
  });
};

module.exports = { tokenSign, verifyToken };