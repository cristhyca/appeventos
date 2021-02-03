const { Router } = require('express');
const router = Router ()
const {renderFormularioRegistro,
    renderFormularioRegistroIniciar,
    registro,
    registroiniciar,
    cerrarSesion
} = require('../controllers/usuarios.controllers');

router.get('/usuarios/registroFormulario', renderFormularioRegistro); 
router.post('/usuarios/registro', registro);
router.get('/usuarios/registroFormularioiniciar', renderFormularioRegistroIniciar);
router.post('/usuarios/registroiniciar', registroiniciar);
router.get('/usuarios/cerrarSesion', cerrarSesion);

module.exports = router;
