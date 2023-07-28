// userController.js (controlador de usuario)

const user = require('../models/usuarios');
const bcrypt = require('../middlewares/bcrypt');


class UsuarioController {
    crearUsuario = async (req, res) => {
      // Encriptar la contraseña antes de guardarla
      await bcrypt.encriptarContrasenaMiddleware(req, res, async () => {
          try {
            const {nombre, cedula, correo, usuario, contrasena, rol} = req.body;
            const nuevoUsuario = new user({nombre, cedula, correo, usuario, contrasena, rol});
            await nuevoUsuario.save();
            res.status(201).json({mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario});
          } catch (error) {
            res.status(500).json({mensaje: 'Error al crear el usuario', error});
          }
        });
    };

    obtenerUsuarios = async (req, res) => {
        try {
          const usuarios = await user.find();
          res.status(200).json({mensaje: 'Usuarios obtenidos correctamente', usuarios});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al obtener los usuarios', error});
        }
    };
      
      // Función para obtener un usuario por su id
    obtenerUsuarioPorId = async (req, res) => {
        try {
          const id = req.params.id;
          const usuario = await user.findById(id);
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
          const usuarioActualizado = await user.findByIdAndUpdate(id, {nombre, cedula, correo, usuario, contrasena, rol}, {new: true});
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
          const usuarioEliminado = await user.findByIdAndDelete(id);
          if (!usuarioEliminado) {
            return res.status(404).json({mensaje: 'Usuario no encontrado'});
          }
          res.status(200).json({mensaje: 'Usuario eliminado correctamente', usuario: usuarioEliminado});
        } catch (error) {
          res.status(500).json({mensaje: 'Error al eliminar el usuario', error});
        }
      };
      // Función para realizar el inicio de sesión
  iniciarSesion = async (req, res) => {
    try {
      const { usuario, contrasena } = req.body;

      // Buscar el usuario en la base de datos
      const usuarioEncontrado = await user.findOne({ usuario });

      if (!usuarioEncontrado) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      // Comparar la contraseña ingresada con la almacenada en la base de datos
      const contrasenaValida = await bcrypt.compare(
        contrasena,
        usuarioEncontrado.contrasena
      );

      if (!contrasenaValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      // Generar un token JWT
      const token = tokenSign({
        usuario: usuarioEncontrado.usuario,
        rol: usuarioEncontrado.rol,
      });

      // Enviar el token como respuesta
      res.cookie('token', token, { httpOnly: true }).status(200).json({
        mensaje: 'Inicio de sesión exitoso',
        token,
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
    }
  };
      
}

const usuarioC = new UsuarioController();

module.exports = usuarioC;