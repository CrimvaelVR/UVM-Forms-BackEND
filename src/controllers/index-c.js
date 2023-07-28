const forms = require('../models/formularios');

class indexController {
    consultarFormularioUser = async (req, res) => {
        try {
          const id_Autor = "64c3ace76b00be0b6a971bc4"
          const formularios = await forms.find({id_Autor: id_Autor})
          const user = 'Jose Escalona'
          res.status(201).render('index-usuarios', {user: user, formularios: formularios})
        } catch (error) {
          res.status(500).json({mensaje: 'Error al crear el formulario', error});
        }
    };

}

const indexC = new indexController();

module.exports = indexC;