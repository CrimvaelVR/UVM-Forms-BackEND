const forms = require('../models/formularios');

class indexController {
    consultarFormularioUser = async (req, res) => {
        try {
          const id_Autor = "esca123456"
          const formularios = await forms.find({id_Autor: id_Autor})

          res.status(201).render('index-usuarios', {user: 'Jose Escalona', formularios: formularios})
        } catch (error) {
          res.status(500).json({mensaje: 'Error al crear el formulario', error});
        }
    };

}

const indexC = new indexController();

module.exports = indexC;