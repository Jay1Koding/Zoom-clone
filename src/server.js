import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';
// import WebSocket from 'ws';
// import { send } from 'process';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', (socket) => {
  socket.onAny((event) => {});
  // 클라이언트의 emit 3번째 인자를 받아 done을 콜백으로 실행.... 세상에
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
  });
});

// 같은 서버에서 http, WebSockets를 둘다 작동시킴
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// const sockets = [];
// // 연결된 브라우저
// wss.on('connection', (socket) => {
//   sockets.push(socket);
//   console.log('connected to Browser');
//   socket['nickname'] = 'Anonymous';
//   socket.on('close', () => console.log('disconnected from browser'));

//   socket.on('message', (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case 'new_message':
//         sockets.forEach((aSockets) =>
//           aSockets.send(`${socket.nickname} : ${message.payload.toString()}`)
//         );
//       case 'nickname':
//         socket['nickname'] = message.payload;
//         console.log(message.payload);
//         break;
//       default:
//         break;
//     }

//     // console.log(typeof msg.toJSON()); // object
//     // console.log(msg.toJSON()); // type : buffer
//   });
//   socket.send('hello!!!');
// });

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
