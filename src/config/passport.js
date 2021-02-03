const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuarios = require('../models/Usuario');
passport.use(new LocalStrategy ({
usernameField: 'email',
passwordField: 'password'
}, async (email, password,done)=>{
   
    // confirmar si coincide el correo del usuario
const user = await usuarios.findOne({email})
if(!user){
    return done(null, false, {message: 'Usuario no existe'});

}else{
    //validar contrasena
  const compara =  await user.comparaContrasena(password);
  if(compara){
      return done (null, user);
  }else{
      return done(null, false,{message: 'Contraseña incorrecta'});

  }

}
}));
passport.serializeUser((user, done)=>{
    done(null,user.id);
});
passport.deserializeUser((id, done)=>{
   usuarios.findById(id,(err, user)=>{
       done(err, user);
   })
});