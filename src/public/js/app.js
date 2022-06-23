const messageList = document.querySelector('ul');
const messageForm = document.querySelector('form');

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

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(input.value);
  input.value = '';
}

// messageList
messageForm.addEventListener('submit', handleSubmit);
