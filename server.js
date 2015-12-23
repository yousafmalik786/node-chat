/**
 * Created by datum019 on 12/23/15.
 * IO server file
 */
var express = require('express');
var swig = require('swig');
var app = express();
var port = 8080;
app.set('view engine', 'swig');
app.engine('html',swig.renderFile);
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false});
// tell express where to serve static files from
app.use(express.static(__dirname + '/public'));
app.get('/admin',function(req,res){
   res.render('admin.html');
});
app.get('/client',function(req,res){
    res.render('client.html');
});
var server = app.listen(port);
console.log('Server listing on port ' +port);

/****************** Socket IO ***********/

var io = require('socket.io').listen(server);
var clients = {}
//on socket connection
io.on('connection', function (socket) {
    //get username from client and save against its socket.
    socket.on('client_username', function (username) {
        if(typeof clients[username] == 'undefined'){
            clients[username] = socket;
        }
        console.log(clients);
    });

    socket.emit('news', { hello: 'world' });
});
