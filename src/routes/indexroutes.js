//requerir express para acceder a la funcion router
const { Router } = require('express')
const router = Router();
//al solicitar la ruta inicial presenta el archivo index
const { renderIndex, renderAbout }= require('../controllers/index.controllers')
router.get ('/', renderIndex);
router.get ('/about', renderAbout);

//exportar, ya que sera utilizado por el server.js  
module.exports = router;
