// userController.js (controlador de usuario)

const forms = require('../models/formularios');
const answers = require('../models/respuestas');
const users = require('../models/usuarios');

class formularioController {
  crearFormulario = async (req, res) => {
    try {
      const datos = req.body;
      const {titulo, descripcion} = req.body
      const id_Autor = "64c3d28e0eda493772477413"
      const formularios = await forms.find()
      let ultimoId

      if (formularios == ""){
        ultimoId = 1
      }else{
        const ultimaPregunta = formularios[formularios.length-1].preguntas
        ultimoId = ultimaPregunta[ultimaPregunta.length-1].id + 1
      }

      const preguntasObj = Object.keys(datos)
      .filter(clave => clave.startsWith("pregunta"))
      .map(clave => datos[clave]);
    
      const preguntas = preguntasObj.map((pregunta, index) => ({
        id: index + Number(ultimoId),
        texto: pregunta,
        tipo: "",
        opciones: "",
      }));

      const nuevoformulario = new forms({id_Autor, titulo, descripcion, preguntas});
      await nuevoformulario.save();
      res.status(201).json({mensaje: 'Formulario creado correctamente', usuario: nuevoformulario});
      
    } catch (error) {
      res.status(500).json({mensaje: 'Error al crear el formulario', error});
    }
  };

  obtenerFormularioId = async (req, res) => {
    try {
      const id = req.params.id;
      const formulario = await forms.findById(id);
      const id_Autor = "64c3ace76b00be0b6a971bc4"
      const user = 'José Escalona'

      if (formulario.id_Autor === id_Autor){

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

      if (!RegExp.escape) {
        RegExp.escape = function(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
      }

      var regex = new RegExp('.*' + RegExp.escape(titulo) + '.*', 'i');
      const resultadoBusqueda = await forms.find({titulo: regex});
      const user = 'José Escalona'
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