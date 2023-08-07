const express = require('express');
const user = require('../models/usuarios');
const bcrypt = require('../middlewares/bcrypt');
const { tokenSign } = require('../middlewares/auth');

class UsuarioController {
  async crearUsuario(req, res) {
    try {
      await bcrypt.encriptarContrasenaMiddleware(req, res, async () => {
        const { nombre, cedula, correo, usuario, contrasena, rol } = req.body;
        const nuevoUsuario = new user({ nombre, cedula, correo, usuario, contrasena, rol });
        await nuevoUsuario.save();
        // En lugar de enviar un JSON, enviamos un script
        res.send(
          `<html>
            <head>
              <style>
              * {
              background-color: #1d555b;
            }
                /* Estilo de la alerta */
                .alert {
                  position: fixed; /* Posición fija */
                  top: 50%; /* A la mitad de la altura */
                  left: 50%; /* A la mitad del ancho */
                  transform: translate(-50%, -50%); /* Centrar el elemento */
                  padding: 20px; /* Espacio interno */
                  font-size: 24px; /* Tamaño de la fuente */
                  background-color: #88c426; /* Color de fondo verde */
                  color: white; /* Color del texto blanco */
                }
                *{
                  background-color: #1d555b;
                  background: #1d555b;
                }
              </style>
            </head>
            <body>
              <div class="alert" > Usuario creado correctamente</div>
              <script>
                // Redirigir al login después de 3 segundos
                setTimeout(() => {
                  window.location.href = '/'; // La URL a la que quieres redirigir
                }, 3000);
              </script>
            </body>
          </html>`
        );
      });
    } catch (error) {
      console.log(error);
      res.status(500).render('404', {mensaje: 'Error al crear usuario'})
    }
  }

  async iniciarSesion(req, res) {
    try {


      if (!req.body.usuario || !req.body.contrasena) {
        return res.status(400).render('404', {mensaje: 'Se requiere el usuario y la contraseña para iniciar sesión.'})

      }
  
      const { usuario, contrasena } = req.body;
      // Buscar el usuario en la base de datos
      const usuarioEncontrado = await user.findOne({ usuario });
      // Verificar si el usuario existe
      if (!usuarioEncontrado) {
        return res.status(401).render('404', {mensaje: 'Credenciales inválidas'})
      }

      // Verificar la contraseña
      const contrasenaValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

      // Si la contraseña es inválida, enviar una respuesta de error
      if (!contrasenaValida) {
        return res.status(401).render('404', {mensaje: 'Credenciales inválidas'})
      }

      // Generar un token JWT
      const token = tokenSign({
        usuario: usuarioEncontrado.usuario,
        rol: usuarioEncontrado.rol,
      });

      // Enviar el token como respuesta al cliente
      res.cookie('token', token, { httpOnly: true }).redirect('/index');

    } catch (error) {
      console.log(error);
      res.status(500).render('404', {mensaje: 'Error al iniciar sesión'})
    }
  }

cerrarSesion = async (req, res) => {
  try {
    // Elimina la cookie del token
    res.clearCookie('token');
    // Redirige al usuario a la página de inicio de sesión
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).render('404', {mensaje: 'Error al cerrar sesión'})
  }  
};
  
}

const usuarioC = new UsuarioController();

module.exports = usuarioC;