// userController.js (controlador de usuario)

const contact = require('../models/contacto');
const jwt = require('jsonwebtoken')

class formularioController {
  async enviarFormulario (req, res){
    try {
      const { nombre, email, cedula, fecha_nac, genero, telefono, asunto, descripcion, imagen } = req.body;
      const nuevoFormulario = new contact({ nombre, email, cedula, fecha_nac, genero, telefono, asunto, descripcion, imagen });
      await nuevoFormulario.save();
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
            </style>
          </head>
          <body>
            <div class="alert" > Formulario enviado correctamente</div>
            <script>
              // Redirigir al login después de 3 segundos
              setTimeout(() => {
                window.location.href = '/'; // La URL a la que quieres redirigir
              }, 3000);
            </script>
          </body>
        </html>`
      );
    } catch (error) {
      console.log(error);
      res.status(500).render('404', {mensaje: 'Error al enviar el formulario'})
    }
  };

  consultarUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.decode(token);
        let username
        if(!token){
            username = '';
        }else{
            username = decoded.usuario;
        }
        res.status(200).render('contacto', {user: username});

    } catch (error) {
      // Si ocurre un error al crear el formulario, enviar un mensaje de error

      res.status(404).render('404', {mensaje: 'Error al cargar usuario'})
    }
  };

}

const contactoC = new formularioController();

module.exports = contactoC;