/**
 * Created by datum019 on 12/23/15.
 * IO server file
 */
var express = require('express');
var swig = require('swig');
var io = require('socket.io');
var app = express();
var port = 8080;
app.set('view engine', 'swig');
app.engine('html',swig.renderFile);
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false});
app.get('/admin',function(req,res){
   res.render('admin.html');
});
var server = app.listen(port);
console.log('Server listing on port ' +port);

/****************** Socket IO ***********/

io.listen(server);