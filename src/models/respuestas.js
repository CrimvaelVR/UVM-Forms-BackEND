const {Schema, model} = require('mongoose');

const RespuestasEsquema = new Schema({
  id_encuesta: {
    type: String,
    required: true
  },
  id_usuario: {
    type: String,
    required: true,
  },
  respuesta: {
    type: String,
    required: true,
  }
},{
  timestamps: true
});

// Crear el modelo de respuesta
const respuestas = model('respuestas', RespuestasEsquema);

// Exportar el modelo de respuesta
module.exports = respuestas;
