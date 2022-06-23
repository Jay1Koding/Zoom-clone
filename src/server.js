import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import { send } from 'process';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (_, res) => res.render('home'));
app.get('*', (_, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 같은 서버에서 http, WebSockets를 둘다 작동시킴
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

// 연결된 브라우저
wss.on('connection', (socket) => {
  sockets.push(socket);
  console.log('connected to Browser');
  socket.on('close', () => console.log('disconnected from browser'));

  socket.on('message', (message) => {
    sockets.forEach((aSockets) => aSockets.send(message.toString()));
  });
  socket.send('hello!!!');
});

server.listen(3000, handleListen);
