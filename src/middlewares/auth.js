const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {JWT_SECRET} = process.env;



// Función para firmar un token JWT
const tokenSign = (usuario) => {
  const token = jwt.sign(usuario, JWT_SECRET, {
    expiresIn: '1h', // Tiempo de expiración del token
  });
  return token;
};

// Middleware para verificar el token en las rutas protegidas
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    // Verificamos el token usando la dependencia de jwt y el método .verify
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // si el token es correcto nos devolvera los datos que pusimos en el token
    req.user = verified;
    // next() indica que el req paso la prueba y continue su camino
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no valido, acceso denegado" });
  }
};

// Middleware para verificar si el usuario está logueado
const verificarSesion = (req, res, next) => {
  // Obtener el token de la cookie
  const token = req.cookies.token;
  console.log(token)

  // Verificar si el token es válido
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Si el token es válido, guardar el usuario en el objeto req
    req.user = decoded;

    // Redirigir al usuario a otra página, por ejemplo, el panel de usuario
    res.redirect("/index");
  } catch (err) {
    // Si el token no es válido o no existe, continuar con el siguiente middleware
    next();
  }
}

module.exports = { tokenSign, verifyToken, verificarSesion};