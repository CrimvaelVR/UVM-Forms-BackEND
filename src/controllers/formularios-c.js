// userController.js (controlador de usuario)

const forms = require('../models/formularios');

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
          res.status(201).json({mensaje: 'Formulario creado correctamente', usuario: nuevoformulario});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al crear el formulario', error});
        }
    };

}

const formularioC = new formularioController();

module.exports = formularioC;