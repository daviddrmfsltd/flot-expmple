//app.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/flot', function(req, res){
  res.sendFile(path.join(__dirname, 'flot.html'));
});


io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    
  socket.on('chat message', function(msg){
  //接收由index.html用socket.io方法發出的'事件'與'帶值'
    console.log('message: ' + msg);
    //'帶值'顯示於終端

    io.emit('chat message', msg);
    //'帶值'發布到前端
  });

  socket.on('ChangeValue', function(valX){
    // console.log('Change Number:' + valQ);
    io.emit('ChangeValue',valX);
  });

});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
  console.log('start at port:' + server.address().port);
});