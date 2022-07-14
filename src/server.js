// import WebSocket from 'ws';
// import { send } from 'process';
import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

wsServer.on('connection', (socket) => {
  socket['nickname'] = 'Anon';
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on('enter_room', (roomName, done) => {
    socket.join(roomName);
    done();
    socket.to(roomName).emit('welcome', socket.nickname);
    wsServer.sockets.emit('room_change', publicRooms());
  });
  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit('bye', socket.nickname)
    );
  });
  socket.on('disconnect', () => {
    wsServer.sockets.emit('room_change', publicRooms());
  });
  socket.on('new_message', (msg, room, done) => {
    socket.to(room).emit('new_message', `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on('nickname', (nickname) => (socket['nickname'] = nickname));
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
