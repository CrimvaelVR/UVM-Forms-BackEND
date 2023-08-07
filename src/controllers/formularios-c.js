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
            const id_Autor = autor.id;
            // Buscar los formularios existentes para obtener el último id
            forms.find()
              .then(formularios => {
                let ultimoId;

                if (formularios == ""){
                  ultimoId = 1;
                }else{
                  const ultimaPregunta = formularios[formularios.length - 1].preguntas;
                  ultimoId = ultimaPregunta[ultimaPregunta.length - 1].id + 1;
                }
  
                const preguntas = [];
                let ultimoId1
                for (let i = 1; datos[`textoPregunta${i}`]; i++) {

                  if (i === 1){
                    ultimoId1 = ultimoId
                  }else {
                    ultimoId1 = ultimoId1 + 1
                  }
                  const pregunta = {};
                  pregunta.id = ultimoId1
                  pregunta.texto = datos[`textoPregunta${i}`];
                  pregunta.tipo = datos[`tipoPregunta${i}`];
                  pregunta.opciones = pregunta.tipo === 'text' ? '' : datos[`Options${i}`];

                  preguntas.push(pregunta);
                }
  
                // Crear un nuevo formulario con el id del autor, el título, la descripción y las preguntas
                const nuevoformulario = new forms({id_Autor, titulo, descripcion, preguntas});
                // Guardar el nuevo formulario en la base de datos
                nuevoformulario.save()
                  .then(formulario => {
                    // Enviar una respuesta con el mensaje y el formulario creados
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
                          <div class="alert" > Formulario creado correctamente</div>
                          <script>
                            // Redirigir al login después de 3 segundos
                            setTimeout(() => {
                              window.location.href = '/index'; // La URL a la que quieres redirigir
                            }, 3000);
                          </script>
                        </body>
                      </html>`
                    );
                  })
                  .catch(error => {
                    // Si ocurre un error al guardar el formulario, enviar un mensaje de error
                    console.error(error);
                    res.status(500).render('404', {mensaje: 'Error al guardar formulario'})
                  });
              })
              .catch(error => {
                // Si ocurre un error al buscar los formularios, enviar un mensaje de error
                console.error(error);
                res.status(500).render('404', {mensaje: 'Error al buscar formularios'})
              });
          } else {
            // Si no se encuentra al autor, enviar un mensaje de error
            res.status(404).render('404', {mensaje: 'Autor no encontrado'})
          }
        })
        .catch(error => {
          // Si ocurre un error al buscar al autor, enviar un mensaje de error
          console.error(error);
          res.status(500).render('404', {mensaje: 'Error al buscar autor'})
        });
    } catch (error) {
      res.status(500).render('404', {mensaje: 'Error al crear formulario'})
    }
  };
  

  verCrearFormulario = async (req, res) => {
    try {

      const token = req.cookies.token;
      // Decodificar el token sin verificar su firma
      const decoded = jwt.decode(token);
      // Obtener el nombre de usuario del token
      const username = decoded.usuario;
      const user = username

      res.status(200).render('formularios-crear', {user: user});

    } catch (error) {
      res.status(500).render('404', {mensaje: 'Error al obtener el usuario'})
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
          return     res.status(404).render('404', {mensaje: 'Formulario no encontrado'})
        }
        res.status(200).render('respuestas-crear', {formulario: formulario, preguntas: preguntas, user:user});

      }

    } catch (error) {
      res.status(404).render('404', {mensaje: 'Error al obtener formulario'})
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

      const datosUsuario = await users.find({usuario: user})


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

      res.status(200).render('formularios-buscar', {resultadoBusqueda: resultadoBusqueda, titulo: titulo, user: user, autor: nombreAutor, autorLogin: datosUsuario[0].id});

    } catch (error) {
      res.status(500).render('404', {mensaje: 'Error al obtener usuario'})
    }
  };


}

const formularioC = new formularioController();

module.exports = formularioC;