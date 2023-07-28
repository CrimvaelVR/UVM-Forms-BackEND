const {Schema, model} = require('mongoose');

const formularioEsquema = new Schema({
  id_Autor: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  preguntas: {
    type: Array,
    required: true
  }
},{
  timestamps: true
});

// Crear el modelo de usuario
const forms = model('forms', formularioEsquema);

// Exportar el modelo de usuario
module.exports = forms;