// userController.js (controlador de usuario)

const forms = require('../models/formularios');
const answers = require('../models/respuestas');
const users = require('../models/usuarios');
const jwt = require('jsonwebtoken')

class formularioController {
  crearFormulario = async (req, res) => {
    try {
      const datos = req.body;
      const {titulo, descripcion} = req.body;
  
      // Obtener el token de la cookie
      const token = req.cookies.token;
      // Decodificar el token sin verificar su firma
      const decoded = jwt.decode(token);
      // Obtener el nombre del autor del token
      const nombreAutor = decoded.usuario;
  
      // Buscar al autor por su nombre en la base de datos
      users.findOne({usuario: nombreAutor})
        .then(autor => {
          // Si se encuentra al autor, obtener su id
          if (autor) {
            const id_Autor = autor._id;
  
            // Buscar los formularios existentes para obtener el último id
            forms.find()
              .then(formularios => {
                let ultimoId;
  
                if (formularios == ""){
                  ultimoId = 1;
                }else{
                  const ultimaPregunta = formularios[formularios.length-1].preguntas;
                  ultimoId = ultimaPregunta[ultimaPregunta.length-1].id + 1;
                }
  
                // Crear un array de preguntas a partir de los datos del formulario
                const preguntasObj = Object.keys(datos)
                  .filter(clave => clave.startsWith("pregunta"))
                  .map(clave => datos[clave]);
                
                const preguntas = preguntasObj.map((pregunta, index) => ({
                  id: index + ultimoId,
                  texto: pregunta,
                  tipo: "",
                  opciones: "",
                }));
  
                // Crear un nuevo formulario con el id del autor, el título, la descripción y las preguntas
                const nuevoformulario = new forms({id_Autor, titulo, descripcion, preguntas});
                // Guardar el nuevo formulario en la base de datos
                nuevoformulario.save()
                  .then(formulario => {
                    // Enviar una respuesta con el mensaje y el formulario creados
                    res.status(201).json({mensaje: 'Formulario creado correctamente', usuario: formulario});
                  })
                  .catch(error => {
                    // Si ocurre un error al guardar el formulario, enviar un mensaje de error
                    console.error(error);
                    res.status(500).json({mensaje: 'Error al guardar el formulario', error});
                  });
              })
              .catch(error => {
                // Si ocurre un error al buscar los formularios, enviar un mensaje de error
                console.error(error);
                res.status(500).json({mensaje: 'Error al buscar los formularios', error});
              });
          } else {
            // Si no se encuentra al autor, enviar un mensaje de error
            res.status(404).json({mensaje: 'Autor no encontrado'});
          }
        })
        .catch(error => {
          // Si ocurre un error al buscar al autor, enviar un mensaje de error
          console.error(error);
          res.status(500).json({mensaje: 'Error al buscar al autor', error});
        });
    } catch (error) {
      res.status(500).json({mensaje: 'Error al crear el formulario', error});
    }
  };

  obtenerFormularioId = async (req, res) => {
    try {
      const id = req.params.id;
      const formulario = await forms.findById(id);

      const token = req.cookies.token;
      // Decodificar el token sin verificar su firma
      const decoded = jwt.decode(token);
      // Obtener el nombre de usuario del token
      const username = decoded.usuario;
      const user = username

      const usuario = await users.find({usuario: username})
      const id_user = usuario[0].id

      if (formulario.id_Autor === id_user){
        const getRespuestas = await answers.find({id_encuesta: id});
        const respuestas = []
        const preguntasForm = formulario.preguntas


        for(let i=0; i<getRespuestas.length ; i++){

          const preguntaConResp = []

          const idRespuestas = getRespuestas[i].respuestas
          let nombreUsuario = await users.findById(getRespuestas[i].id_User)

          for(let f=0; f< idRespuestas.length;f++){

            if(preguntasForm[f].id == idRespuestas[f].id_pregunta){

              preguntaConResp[f] = {
                textoPregunta: preguntasForm[f].texto,
                respuestaPregunta: idRespuestas[f].texto_respuesta
              }
            }
          }

          respuestas[i] = {
            nombreUsuario: nombreUsuario.nombre,
            respuestas: preguntaConResp
          }
        }

        res.status(200).render('respuestas-ver', {formulario: formulario, user:user, respuestas:respuestas});

      }else{

        const preguntas = formulario.preguntas
        if (!formulario) {
          return res.status(404).json({mensaje: 'Formulario no encontrado'});
        }
        res.status(200).render('respuestas-crear', {formulario: formulario, preguntas: preguntas});

      }

    } catch (error) {
      res.status(500).json({mensaje: 'Error al obtener el usuario', error});
    }
  };

  consultarFormularioTitulo = async (req, res) => {
    try {
      const titulo = req.params.titulo;

      const token = req.cookies.token;
      // Decodificar el token sin verificar su firma
      const decoded = jwt.decode(token);
      // Obtener el nombre de usuario del token
      const username = decoded.usuario;
      const user = username

      if (!RegExp.escape) {
        RegExp.escape = function(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
      }

      var regex = new RegExp('.*' + RegExp.escape(titulo) + '.*', 'i');
      const resultadoBusqueda = await forms.find({titulo: regex});
      let nombreAutor = []
      let autores = []
      for (let i=0; i < resultadoBusqueda.length; i++){
        autores[i] = await users.findById(resultadoBusqueda[i].id_Autor);
      }

      for(let f=0; f<autores.length; f++){
        nombreAutor[f]= autores[f].nombre
      }

      res.status(200).render('formularios-buscar', {resultadoBusqueda: resultadoBusqueda, titulo: titulo, user: user, autor: nombreAutor});

    } catch (error) {
      res.status(500).json({mensaje: 'Error al obtener el usuario', error});
    }
  };


}

const formularioC = new formularioController();

module.exports = formularioC;