const { verifyToken } = require("./auth")
const users = require('../models/usuarios');
const jwt = require('jsonwebtoken')

const checkRole = async (req, res, next, roles) => {
    try {
        const token = req.cookies.token;
        // Decodificar el token sin verificar su firma
        const decoded = jwt.decode(token);
        // Obtener el nombre de usuario del token
        const username = decoded.usuario;

        const usuario = await users.find({usuario: username})

        const rol = usuario[0].rol

        if (usuario) {
            if (roles.includes(rol)){
                next()
            }else{
                res.status(409)
                res.send('NO TIENES PERMISO CON TU ROL DE ' + rol)
            }
        } else {
            res.status(409)
            res.send('NO TIENES ACCESO')
        }
    }catch (e){
        console.log(e);
        res.status(409)
        res.send('SIN ACCESO')
    }
}

module.exports = checkRole