const {Schema, model} = require('mongoose');

const UsuarioEsquema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  cedula: {
    type: Number,
    required: true,
    unique: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/
  },
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true,
    enum: ['administrador', 'usuario', 'invitado']
  }
},{
  timestamps: true
});
// Crear el modelo de usuario
const users = model('users', UsuarioEsquema);

// Exportar el modelo de usuario
module.exports = users;
