const jwt = require('jsonwebtoken')


class landingController {
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
        res.status(200).render('landing', {user: username});

    } catch (error) {
      // Si ocurre un error al crear el formulario, enviar un mensaje de error

      res.status(404).render('404', {mensaje: 'Error al cargar usuario'})
    }
  };
}

const landingC = new landingController();

module.exports = landingC;