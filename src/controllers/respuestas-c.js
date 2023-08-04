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
          const user = username
          const usuario = await users.find({usuario: username})
          const id_User = usuario[0].id

          const postRespuestas = req.body;
          const respuestas = [];
          console.log(postRespuestas)

          

          for (let i = 0; i < postRespuestas.id.length; i++) {
            respuestas[i] = {
              id_pregunta: Number(postRespuestas.id[i]),
              texto_respuesta: postRespuestas.Texto_Respuesta[i],
              opcion_selecicionada: ''
            };
          }
          const nuevaRespuesta = new answers({id_encuesta, id_User, respuestas});
          await nuevaRespuesta.save();
          res.status(201).json({mensaje: 'Respuesta agreagada correctamente', respuesta: nuevaRespuesta});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al registrar respuesta', error});
        }
      };

      // Función para obtener una respuesta por su id de encuesta
    obtenerRepuestaPorId = async (req, res) => {
      Form.find({titulo: titulo}, (err, formularios) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error al buscar los formularios');
        } else {
          // Enviar los datos de los formularios a una vista que los muestre y permita acceder a ellos
          res.render('lista', {formularios: formularios});
        }
      });
    };
}

const respuestasC = new RespuestasController();

module.exports = respuestasC;