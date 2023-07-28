const {Schema, model} = require('mongoose');

const RespuestasEsquema = new Schema({
  id_encuesta: {
    type: String,
    required: true
  },
  id_User: {
    type: String,
    required: true,
  },
  respuestas: {
    type: Array,
    required: true,
  }
},{
  timestamps: true
});

// Crear el modelo de respuesta
const answers = model('answers', RespuestasEsquema);

// Exportar el modelo de respuesta
module.exports = answers;
