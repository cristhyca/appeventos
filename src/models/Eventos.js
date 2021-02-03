const {Schema, model} = require('mongoose');
const EventosSchema = new Schema({
title:{
    type: String,
    required: true
},
fecha:{
    type: String,
    required: true
},   
descripcion:{
    type: String,
    required: true
}, 
user:{
    type: String,
    required: true
}

}, {
    timestamps: true
})
//se va a utilizar en otras parte  del codigo por ello module.exports para exportarlo
module.exports =  model('Eventos', EventosSchema );

