const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Método para encriptar la contraseña antes de guardarla
UsuarioEsquema.pre('save', async function(next) {
  const usuario = this;
  if (!usuario.isModified('contrasena')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(usuario.contrasena, salt);
  usuario.contrasena = hash;
  next();
});

// Método para comparar la contraseña con la almacenada
UsuarioEsquema.methods.compararContrasena = async function(contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

// Crear el modelo de usuario
const users = model('users', UsuarioEsquema);

// Exportar el modelo de usuario
module.exports = users;
