
// let express = require('express');
// let http = require('http');
// const cors = require('cors');
// const appp = express();appp.use(cors())

let mongoose = require('mongoose');
let app = require('./app');

let path = require('path');

require('dotenv').config({path: 'variables.env'});

const { ExpressPeerServer, PeerServer  } = require ('peer');

let connection = require('./common/connection');
const User = require('./model/user.model');

// let socketio = require('socket.io');

// const server = http.createServer(app)

// const io = socketio.listen(server)

// let socketio = require('socket.io');
console.log(process.env.DB_URL)
/**///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
// esto es para lo del socket.io
                        // const server = require('http').createServer(app);
                        // const io = require('socket.io')(server,{
                        //     cors:{
                        //         origin:['http://localhost:8100']      // esto resuelve los problema del (CORS) para lo del webSocket
                        //     }
                        // });///

                        // io.on('connection',function (socket) {
                        //         console.log('new user connect')

                        //         socket.emit('test event', 'kasdhfjkashdfjkahsdjkfdddddd')
                        //     })

    //******************************************************************************************************************** */
//let port = 3800;
var host = process.env.HOST || "0.0.0.0";
var port = process.env.PORT || 3000;
//ac-ccswtcz-shard-00-02.tvfjxum.mongodb.net


// io.on('connection',socket => {
//     console.log('new user connect')
// })

mongoose.Promise = global.Promise;

//Coneccion a la dase de datos
//'mongodb://localhost:27017/odonto_arte'
mongoose.connect(process.env.DB_URL,{ useNewUrlParser : true})
                .then((db) => {
                    console.log('La conexion a la base de datos se ha realizado correctamente');


                    //Crear servidor
                    var serve = app.listen( port, () => {
                        console.log('port-*',port)
                     
                        // video de socket https://www.youtube.com/watch?v=CKrJZdxEeNA , parte de este codigo es de este video o una idea 
                        /**/////////////////////////////////////////////// */
                        //coneccion con peer para la videollamada
                        /**////////////////////////////////////////////// */
                        //https://www.youtube.com/watch?v=0wqteZNqruc
                        console.log('El servidor esta en ejecucion !')
                    })
                    const peerServer = ExpressPeerServer(serve, {
                        debug: true,
                       
                       // path:'/myapp'                                  
                        });
                           
                        app.use('/peerjs', peerServer); // videollamada 
                        
                        let socketio = require('socket.io')
                        
                        var io =  socketio(serve,{
                            cors:{
                                origin:['http://localhost:8100','http://localhost'],
                               
                            },
                            //este codigo es porque da un error (ws:) y puse esto para eliminar el error
                            forceNew: true,
                            transports: ["polling"],   //https://stackoverflow.com/questions/49575350/websocket-connection-to-wss-error-during-websocket-handshake-unexpected-re
                            
                        })
                                // aqui llamamos el metodo socker y le pasamos el servidor, lo hicimos pora no tenerlo aqui en esta page...
                                require('./socker')(io);
                                    
                    // io.on('connection',(socket) => {

                    //     // console.log('A connection has been created with ' + socket.id);
                    //     // socket.emit('test event','wualalalalallaalal');//

                    //     // socket.on(connection.create, (newData) => {
                    //     //     sk.sockets.emit(connection.create, newData)
                    //     // })

                    //     socket.on('chat: uo', (data) => {
                    //         io.sockets.emit('chat: uo02', data)
                    //         console.log('successfuly',data)
                    //     })
                    // })
                })
                .catch(err => console.log(err))


                    // const changeStream = User.watch();

                    // changeStream.on('change', (change) => {
                    //     console.log(change); // You could parse out the needed info and send only that data. 
                    //     io.emit('changeData', change);
                    // }); 

               

                    //Esta pagina es para lo de la db realtime.....
                    
 //https://es.quish.tv/how-use-mongodb-real-time-database-with-node