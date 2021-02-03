const usuarioscontroladores = {};
const passport = require('passport');

const usuarios = require('../models/Usuario')
usuarioscontroladores.renderFormularioRegistro = (req, res) => {
    res.render('vistasusuarios/registroup');
}
usuarioscontroladores.registro = async (req, res) => {
    /* ver coleccion en concola console.log(req.body);
    res.send('recibido');*
        res.send('Registrado correctamente');*/
    /*guardar en la bd */
    const { nombre, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Las contraseña debe tener mínimo 4 carácteres' });
    }
    if (errors.length > 0) {
        res.render('vistasusuarios/registroup', {
            errors,
            nombre,
            email
        })
        console.log(req.body);
    } else {
        const emailUser = await usuarios.findOne({email: email });
        if(emailUser){
            req.flash('mensaje_erroneo', 'Correo en uso');
            res.redirect('/usuarios/registroFormulario');
        }else{
           const newUser = new usuarios ({nombre, email, password})
           newUser.password = await newUser.cifrarContrasena(password)
          await newUser.save();
          req.flash('mensaje_exito', 'Estas registrado correctamente');
          res.redirect('/usuarios/registroFormularioiniciar');
        }
    }
};
usuarioscontroladores.renderFormularioRegistroIniciar = (req, res) => {
    res.render('vistasusuarios/registroin');
}
usuarioscontroladores.registroiniciar = passport.authenticate('local', {
    failureRedirect: '/usuarios/registroFormularioiniciar',
    successRedirect: '/eventos',
    failureFlash: true
});

usuarioscontroladores.cerrarSesion = (req, res) => {
    req.logout();
    req.flash('mensaje_exito', 'Tu sesión ha sido cerrada');
    res.redirect('/usuarios/registroFormularioiniciar');
}
module.exports = usuarioscontroladores;