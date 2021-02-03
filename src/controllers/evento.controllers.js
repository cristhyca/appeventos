const eventocontroladores = {};
const Eventos = require('../models/Eventos')
eventocontroladores.renderEventoForm = (req, res) => {
    res.render('vistaseventos/new-evento');
};
eventocontroladores.createNewEvent = async (req, res) => {
    const { title, fecha, descripcion } = req.body;
    const newEvent = new Eventos({ title, fecha, descripcion })
    //debe guardar asi no termine de renderizar
    newEvent.user = req.user.id;
    await newEvent.save();
    req.flash('mensaje_exito', 'Evento agregado existosamente');
    res.redirect('/eventos')
    /*res.send('nuevo evento');*/
};
eventocontroladores.renderizarEventos = async (req, res) => {
    const mostrareventos = await Eventos.find({user: req.user.id}).lean();
    res.render('vistaseventos/allevento', { mostrareventos });
};
eventocontroladores.renderEditarEventos = async (req, res) => {
    const actualizae = await Eventos.findById(req.params.id).lean();
 if(actualizae.user !=req.user.id){
     req.flash('mensaje_erroneo', 'No tienes autorización')
     return res.redirect('/eventos');
 }
    res.render('vistaseventos/edit-evento', { actualizae });
};

eventocontroladores.actualizarEventos = async (req, res) => {
    const { title, fecha, descripcion } = req.body;
    await Eventos.findByIdAndUpdate(req.params.id, { title, fecha, descripcion })
    req.flash('mensaje_exito', 'Evento actualizado existosamente');
    res.redirect('/eventos');
};
eventocontroladores.eliminarEventos = async (req, res) => {
    await Eventos.findByIdAndDelete(req.params.id);
    req.flash('mensaje_exito', 'Evento eliminado existosamente');
    res.redirect('/eventos')
}


module.exports = eventocontroladores;