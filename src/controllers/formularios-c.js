// userController.js (controlador de usuario)

const forms = require('../models/formularios');
const answers = require('../models/respuestas');
const users = require('../models/usuarios');

class formularioController {
  crearFormulario = async (req, res) => {
    try {
      const datos = req.body;
      const {titulo, descripcion} = req.body
      const id_Autor = "esca123456"
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
        id: index + ultimoId,
        texto: pregunta,
        tipo: "",
        opciones: "",
      }));

      const nuevoformulario = new forms({id_Autor, titulo, descripcion, preguntas});
      await nuevoformulario.save();
      res.status(201).render({mensaje: 'Formulario creado correctamente', usuario: nuevoformulario});
      
    } catch (error) {
      res.status(500).json({mensaje: 'Error al crear el formulario', error});
    }
  };

  obtenerFormularioId = async (req, res) => {
    try {
      const id = req.params.id;
      const formulario = await forms.findById(id);
      const id_Autor = "64bdc96bb35effdbf71156f9"

      if (formulario.id_Autor === id_Autor){

        const getRespuestas = await answers.find({id_encuesta: id});
        const respuestas = []
        for(let i=0; i<getRespuestas.length ; i++){

          let nombreUsuario = await users.findById(getRespuestas[i].id_User)

          respuestas[i] = {
            nombreUsuario: nombreUsuario.nombre,
            respuestas: getRespuestas[i].respuestas
          }
        }
        console.log(respuestas)
        res.status(200).render('respuestas-ver', {formulario: formulario});

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


}

const formularioC = new formularioController();

module.exports = formularioC;