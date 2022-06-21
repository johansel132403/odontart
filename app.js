
let express = require('express');
let bodyParser  = require('body-parser');

const { ExpressPeerServer } = require ('peer');

var app = express();



// let socketio = require('socket.io');

//coneccion con peer para la videollamada
// const peerServer = ExpressPeerServer(server, {
// debug: true,
// });

// const server = require('http').createServer();
// const io = require('socket.io')(server);

// io.on('connection',socket => {
    //         console.log('new user connect')
    //     })
    
    //Cargar Rutas 
    // let userRouter = require('../back-end/routers/userRouter');
    // let citaRouter = require('../back-end/routers/citasRouter')
    let userRouter = require('./routers/userRouter');
    let citaRouter = require('./routers/citasRouter')

    
    
    //Middlewares
    app.use(bodyParser.urlencoded( { extended: false } ))
    app.use(bodyParser.json());
    
    
    //CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    
    
    
    //Rutas 
   // app.use('/peerjs', peerServer); // videollamada
    app.use('/api', userRouter);
    app.use('/api', citaRouter);

//export 

module.exports = app;