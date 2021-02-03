const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
//inicializaciones
const app = express();
require('./config/passport');

//settings
//const host= process.env.HOST || '0.0.0.0';
//const port = process.env.PORT || 3000;
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');
//acceder a la carpeta vistas para que sea multiplataforma
app.set('views', path.join(__dirname, 'views'));
//Configuracion de plantillas
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  //para que se diriga a la carpeta empleando el path. join
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  //extension a utilizar en los layouts
  extname: '.hbs'
}));
//establecer el motor de plantillas 
app.set('view engine', '.hbs');

//middlewares soportar tipo de datos entre servidor y cliente
//cuando llegan datos convertir en objeto json
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
//configurar sesiones para guardar msj
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales 
app.use((req, res, next) => {
  res.locals.mensaje_exito = req.flash('mensaje_exito');
  res.locals.mensaje_erroneo = req.flash('mensaje_erroneo');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;

  next();

});

//usar archivo indexroutes cada vez que se solicite rutas 

app.use(require('./routes/indexroutes'));
app.use(require('./routes/eventos.routes'));
app.use(require('./routes/usuarios.routes'));


//static files
//buscar archivos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app