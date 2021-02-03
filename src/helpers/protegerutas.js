const helpers ={}
helpers.isAuthenticated = (req, res, next) =>{
if(req.isAuthenticated ()){
    
    return next();
}
req.flash('mensaje_erroneo', 'No estas autorizado');
res.redirect('/usuarios/registroFormularioiniciar');
}
module.exports = helpers;