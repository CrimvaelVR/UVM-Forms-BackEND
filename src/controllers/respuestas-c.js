// respuestasController.js (controlador de respuestas)

const answers = require('../models/respuestas');
const users = require('../models/usuarios');
const jwt = require('jsonwebtoken')

class RespuestasController {

    crearRespuesta = async (req, res) => {
        try {
          const id_encuesta = req.params.id;
          const token = req.cookies.token;
          // Decodificar el token sin verificar su firma
          const decoded = jwt.decode(token);
          // Obtener el nombre de usuario del token
          const username = decoded.usuario;
          const usuario = await users.find({usuario: username})
          const id_User = usuario[0].id

          const postRespuestas = req.body;

          let contar = 0
          const respuestas = postRespuestas.id.map(id => {
            const numId = parseInt(id)
            contar += 1
            const respuesta = {
              'id_pregunta': numId,
              'texto_respuesta': postRespuestas[`Texto_Respuesta${contar}`]
            };
            return respuesta;
          });

          const nuevaRespuesta = new answers({id_encuesta, id_User, respuestas});
          await nuevaRespuesta.save();
          res.status(201).send(
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
                    border-radius: 30px
                    color: white; /* Color del texto blanco */
                  }
                </style>
              </head>
              <body>
                <div class="alert"> Respuesta enviada correctamente</div>
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
          res.status(500).render('404', {mensaje: 'Error al registrar respuesta'})
        }
      };

      // Función para obtener una respuesta por su id de encuesta
    obtenerRepuestaPorId = async (req, res) => {
      Form.find({titulo: titulo}, (err, formularios) => {
        if (err) {
          console.error(err);
          res.status(500).render('404', {mensaje: 'Error al buscar formularios'})
        } else {
          // Enviar los datos de los formularios a una vista que los muestre y permita acceder a ellos
          res.render('lista', {formularios: formularios});
        }
      });
    };
}

const respuestasC = new RespuestasController();

module.exports = respuestasC;