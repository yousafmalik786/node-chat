/**
 * Created by datum019 on 12/23/15.
 * IO server file
 */
var express = require('express');
var app = express();
var port = 8080;
var swig = require('swig');
app.set('view engine', 'swig');
app.engine('html',swig.renderFile);
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false});
app.get('/',function(req,res){
   res.render('index.html');
});
app.listen(port);
console.log('Server listing on port ' +port);