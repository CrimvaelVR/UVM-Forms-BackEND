const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const cors = require('cors');


///INICIALIZACIONES
const app = express();

// CONFIGURACIONES
app.set('port', process.env.PORT || 4000 );

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('scripts', path.join(__dirname, 'scripts'));






// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({ credentials: true }))


// VARIABLES GLOBALES

// ROUTES
const usuariosRuta = require('./routes/usuario');
const formularioRuta = require('./routes/formularios')
const indexRuta = require('./routes/index');
const busquedaRuta = require('./routes/busqueda');
const contactoRuta = require('./routes/contacto');
const landingRuta = require('./routes/landing');
const errorRuta = require('./routes/error');


app.use('/usuarios', usuariosRuta);
app.use('/formularios', formularioRuta)
app.use('/index', indexRuta)
app.use('/busqueda', busquedaRuta)
app.use('/', landingRuta)
app.use('/contacto', contactoRuta);
app.use('/error', errorRuta)

//ARCHIVOS ESTATICOS

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;