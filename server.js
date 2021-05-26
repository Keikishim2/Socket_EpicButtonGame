
const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index");
});

var server = app.listen(8000, function () {
    console.log('Listening on port 8000');
});

const io = require('socket.io')(server);
var count = 0;
io.sockets.on('connection', function (socket) {
    socket.on("button_clicked", function () {
        count += 1;
        io.emit("times", { response: count });
    });
    socket.on("reset", function () {
        count = 0;
        io.emit('updatedcount', { response: count });
    });

})