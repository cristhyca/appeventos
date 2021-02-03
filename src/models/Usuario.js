const {Schema, model} = require('mongoose');
const bcrypt =  require('bcryptjs');

const UsuarioSchema = new Schema({
nombre:{type: String, required: true},
email:{type: String, required: true, unique: true}, 
//cifrar contraseña  
password:{type: String, required: true}
}, {
    timestamps: true
})
//metodo cifrar constrasena
UsuarioSchema.methods.cifrarContrasena =  async password => {
//metodo asincrono tomara algo de tiempo pero podemos usar await para que continue  con otros procesos mientras cifra
const salt = await bcrypt.genSalt(10);
return await bcrypt.hash(password, salt);
};
//metodo comparar contrasena cuando el usuario ingresa a la aplicacion
UsuarioSchema.methods.comparaContrasena = async function (password) {
    return await bcrypt.compare(password, this.password)
}
//se va a utilizar en otras parte  del codigo por ello module.exports para exportarlo
module.exports =  model('Usuarios', UsuarioSchema );