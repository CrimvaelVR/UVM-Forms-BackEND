// userController.js (controlador de usuario)

const Usuario = require('../models/usuarios');

class UsuarioController {
    crearUsuario = async (req, res) => {
        try {
          const {nombre, cedula, correo, usuario, contrasena, rol} = req.body;
          const nuevoUsuario = new Usuario({nombre, cedula, correo, usuario, contrasena, rol});
          await nuevoUsuario.save();
          res.status(201).json({mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al crear el usuario', error});
        }
      };

    obtenerUsuarios = async (req, res) => {
        try {
          const usuarios = await Usuario.find();
          res.status(200).json({mensaje: 'Usuarios obtenidos correctamente', usuarios});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al obtener los usuarios', error});
        }
    };
      
      // Función para obtener un usuario por su id
    obtenerUsuarioPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const usuario = await Usuario.findById(id);
          if (!usuario) {
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
          }
          res.status(200).json({mensaje: 'Usuario obtenido correctamente', usuario});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al obtener el usuario', error});
        }
      };
      
      // Función para actualizar un usuario por su id
    actualizarUsuarioPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const {nombre, cedula, correo, usuario, contrasena, rol} = req.body;
          const usuarioActualizado = await Usuario.findByIdAndUpdate(id, {nombre, cedula, correo, usuario, contrasena, rol}, {new: true});
          if (!usuarioActualizado) {
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
          }
          res.status(200).json({mensaje: 'Usuario actualizado correctamente', usuario: usuarioActualizado});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al actualizar el usuario', error});
        }
      };
      
      // Función para eliminar un usuario por su id
    eliminarUsuarioPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const usuarioEliminado = await Usuario.findByIdAndDelete(id);
          if (!usuarioEliminado) {
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
          }
          res.status(200).json({mensaje: 'Usuario eliminado correctamente', usuario: usuarioEliminado});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al eliminar el usuario', error});
        }
      };
}

const usuarioC = new UsuarioController();

module.exports = usuarioC;