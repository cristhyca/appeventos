const { Router } = require('express')
const router = Router()
const { renderEventoForm, 
    createNewEvent, 
    renderizarEventos, 
    renderEditarEventos,
     actualizarEventos, 
     eliminarEventos } = require('../controllers/evento.controllers');


const {isAuthenticated} = require('../helpers/protegerutas');
//nuevo evento
router.get('/eventos/add', isAuthenticated, renderEventoForm);
router.post('/eventos/nuevoevento', isAuthenticated, createNewEvent);
// obtener eventos
router.get('/eventos', isAuthenticated, renderizarEventos);
//Editar eventos
router.get('/eventos/edit/:id', isAuthenticated,  renderEditarEventos)
router.put('/eventos/edit/:id', isAuthenticated, actualizarEventos);
// Eliminar eventos
router.delete('/eventos/delete/:id', isAuthenticated, eliminarEventos);

module.exports = router
