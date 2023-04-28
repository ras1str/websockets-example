var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');


server.listen(3000, (err)=>{
    console.log( err ? 'Error' + err : 'Listening on port 3000')
});


app.get('/', function(request, respons){

    respons.sendFile(__dirname + '/index.html');
 

});


app.get('/second.html',(request, respons) => {

    respons.sendFile(__dirname + '/second.html')


})



users = [];
connections = [];

io.sockets.on('connection', function(socket){
    console.log("Успешное соединение");
    connections.push(socket);

    socket.on('disconnect', function(data){
    
        connections.splice(connections.indexOf(socket),1);
        console.log("Успешное отсоединение");


    });

    socket.on('send mess', function(data){

        io.sockets.emit('add mess', {mess: data.mess, name: data.name});


    });
});
