const express = require('express');
const routes = require('./routes'); //caminho relativo
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const socketio = require('socket.io');
const http = require('http');  

const server = http.Server(app);
const io = socketio(server);


mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ueivw.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUsers = {};

io.on('connection', socket => {
    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io; //disponibilizando para todas rotas o io. Atraves da req
    req.connectedUsers = connectedUsers;

    return next();
});

//app.use(cors{origin: 'http://localhost:3333'}); pode determinar qual url pode chamar o servico
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);  