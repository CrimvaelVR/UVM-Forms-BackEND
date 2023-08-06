// userController.js (controlador de usuario)

const contact = require('../models/contacto');

class formularioController {
  async enviarFormulario (req, res){
    try {
      const { nombre, email, cedula, fecha_nac, genero, telefono, asunto, descripcion, imagen } = req.body;
      const nuevoFormulario = new contact({ nombre, email, cedula, fecha_nac, genero, telefono, asunto, descripcion, imagen });
      await nuevoFormulario.save();
      res.status(201).json({ mensaje: 'Mensaje enviado correctamente', formulario: nuevoFormulario });
    } catch (error) {
      console.log(error);
      res.status(500).json({ mensaje: 'Error al enviar el formulario', error });
    }
  };


  /*
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
        RegExp.escape = function (s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };
      }

      var regex = new RegExp('.*' + RegExp.escape(titulo) + '.*', 'i');
      const resultadoBusqueda = await forms.find({ titulo: regex });
      let nombreAutor = []
      let autores = []
      for (let i = 0; i < resultadoBusqueda.length; i++) {
        autores[i] = await users.findById(resultadoBusqueda[i].id_Autor);
      }

      for (let f = 0; f < autores.length; f++) {
        nombreAutor[f] = autores[f].nombre
      }

      res.status(200).render('formularios-buscar', { resultadoBusqueda: resultadoBusqueda, titulo: titulo, user: user, autor: nombreAutor });

    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
    }
  };
*/

}

const contactoC = new formularioController();

module.exports = contactoC;