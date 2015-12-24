/**
 * Created by datum019 on 12/23/15.
 * IO server file
 */
var express = require('express');
var swig = require('swig');
var _ = require('underscore');
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
var admins = {}
//on socket connection
io.on('connection', function (socket) {
    //get email from client and save against its socket.
    socket.on('client_credentials', function (data) {
        if(typeof clients[data.email] == 'undefined'){
            clients[data.email] = socket;
            socket.emit('welcome', { message: 'Welcome '+data.name});
        }
        console.log(clients);

    });
    // on client first message
    socket.on('NewUserMessage',function(data){
        console.log(data);
        var replyTo = '';
        for(var key in clients){
            if(clients[key] === socket){
                replyTo = key;
            }
        }
        var response = {replyTo: replyTo,message :data.message}
        // check if we have admin available
        if(Object.keys(admins).length !== 0){
            var adminValues = _.values(admins);
            var selectedAdmin = adminValues[0];
            console.log(selectedAdmin);
            selectedAdmin.emit('NewClient', response);
        }
    });
    // admin side
    socket.on('admin_credentials', function (data) {
        //verify admin credentials with database and add add it to admin list
        if(typeof admins[data.email] == 'undefined'){
            admins[data.email] = socket;
            socket.emit('welcome', { message: 'Welcome Admin'});
        }
        console.log(admins);
    });
});

