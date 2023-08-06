// userController.js (controlador de usuario)

const contact = require('../models/contacto');
const jwt = require('jsonwebtoken')

class formularioController {
  async enviarFormulario (req, res){
    try {
      const { nombre, email, cedula, fecha_nac, genero, telefono, asunto, descripcion, imagen } = req.body;
      const nuevoFormulario = new contact({ nombre, email, cedula, fecha_nac, genero, telefono, asunto, descripcion, imagen });
      await nuevoFormulario.save();
      res.status(201).json({ mensaje: 'Mensaje enviado correctamente', formulario: nuevoFormulario });
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