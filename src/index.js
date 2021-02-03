//modulo para no configurar despues al desplejarlo en hosting la bd
//config leer lo del archivo env para crear variables de entorno
require('dotenv').config();
const app = require('./server');
require('./database');
app.listen(app.get('port'), ()=>{
    console.log('server on port 3000', app.get('port'))
})