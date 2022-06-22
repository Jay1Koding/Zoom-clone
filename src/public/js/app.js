// 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener('open', () => {
  console.log('connected to Server');
});

socket.addEventListener('message', (message) => {
  console.log('New Message : ', message.data);
});

socket.addEventListener('close', () => {
  console.log('disconnected from Server');
});

setTimeout(() => {
  socket.send('hello from the browser');
}, 10000);

alert('hello');
