
let Controller = require('../controllers/citasController')

let express = require('express');

let api = express();

let md_auth = require('../middleware/authenticate');


api.post('/crearcita/:id', md_auth.ensureAuth ,Controller.crearCitas);
api.get('/getonecita/:id',  md_auth.ensureAuth, Controller.getOneCita);
api.get('/getallcita', /*md_auth.ensureAuth,*/  Controller.getAllCitas);
api.get('/getusercitas/:id', Controller.getCitaOfUser);
api.get('/getcitaoneuser/:id'/*,md_auth.ensureAuth*/,Controller.getOnecitaAndUser)
api.get('/getcitaswithuser', md_auth.ensureAuth,Controller.getAllCitaWithUser)
api.put('/actualizarcita/:id',  md_auth.ensureAuth, Controller.updateCita);
api.delete('/deletecita/:id', md_auth.ensureAuth, Controller.deletecita);


module.exports = api;