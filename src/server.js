const express = require('express');
const path = require('path')

///INICIALIZACIONES
const app = express();

// CONFIGURACIONES
app.set('port', process.env.PORT || 4000 );

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



// MIDDLEWARES
app.use(express.urlencoded({extended: false}));

// VARIABLES GLOBALES

// ROUTES
const usuariosRuta = require('./routes/usuario');
const formularioRuta = require('./routes/formularios')

app.use('/usuarios', usuariosRuta);
app.use('/formularios', formularioRuta)

//ARCHIVOS ESTATICOS

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;