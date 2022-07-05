
let express = require('express');

let controllers = require('../controllers/userController');
let path = require('path');

let api = express.Router();

let md_auth = require('../middleware/authenticate');

let multiparty = require('connect-multiparty');  //multiparty({uploadDir:"./uploads/user"})
let multipartImg = multiparty({uploadDir: "./uploads/user"})

var timeout = require('connect-timeout')

api.get( '/',md_auth.ensureAuth, controllers.home );
api.post('/registrar',controllers.saveUser);
api.post('/login',controllers.loginUser);
api.post('/getemail',controllers.getByEmail);
api.get('/getuser/:id',md_auth.ensureAuth,controllers.getUser);
api.get('/getAllUsers/:page?', md_auth.ensureAuth ,controllers.getAllUsers);
api.put('/actualizar/:id', md_auth.ensureAuth ,controllers.updateUser);
api.put('/actualizar02/:id', md_auth.ensureAuth ,controllers.updateUser02);
api.put('/actualizar03/:id', md_auth.ensureAuth ,controllers.updateUser03);
api.delete('/deleteuser/:id', md_auth.ensureAuth ,controllers.deleteUser);
api.post('/subimagen/:id',[md_auth.ensureAuth],controllers.uploadImagen); //md_auth.ensureAuth, le quite eso essa es la autenticacion.... tambien le quite el /:id // eslo lo actualize, le puse el md_auth.ensureAuth 28/5/2022
api.post('/subimagen02/:email',[multipartImg],controllers.uploadImagen02); //md_auth.ensureAutupdateNoteViewh, le quite eso essa es la autenticacion.... tambien le quite el /:id

api.post('/subimagen02New/:email',controllers.uploadImagen02New);
api.post('/subimagen04/:id',controllers.uploadImagenChatNew);

api.post('/savechat',controllers.saveChat);
api.get('/getChat/:email',controllers.getChatByEmail);
api.post('/getConv/:email',controllers.getBothChat);
api.put('/calificando/:id',controllers.calificandoDoct);
api.put('/calificar/:id',controllers.calificar);
api.put('/cambiarcontrasena/:id',md_auth.ensureAuth,controllers.cambiarContrasena);
api.post('/crearnota',controllers.crearNotificacion);
api.put('/actualizarnota/:id',controllers.updateNota);
api.delete('/borrarnota/:id',controllers.deleteNote);
api.post('/imagennota/:id',controllers.imagenNote);
api.get('/getAllNote',controllers.obtenerTodasNotificacion);
api.get('/getOneNote',controllers.obtenerUnoNota);
api.put('/updateNoteView',[timeout('20s')], controllers.updateAllNote);
api.put('/updateAllNoteWithId/:id',md_auth.ensureAuth,controllers.updateAllNoteWithId);
api.get('/getImagenChat/:email',controllers.getImgFromChat);



api.get('/getimagen/:imagenpath', controllers.getImg);


   




module.exports = api;

