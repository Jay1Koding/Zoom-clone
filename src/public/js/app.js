const messageList = document.querySelector('ul');
const nicknameForm = document.querySelector('#nickname');
const messageForm = document.querySelector('#message');

// 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener('open', () => {
  console.log('connected to Server');
});

socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);

  console.log('New Message : ', message.data);
});

socket.addEventListener('close', () => {
  console.log('disconnected from Server');
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('new_message', input.value));
  input.value = '';
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));
  input.value = '';

  // socket.send({
  //   type: 'nickname',
  //   payload: input.value,
  // });
}

// messageList
messageForm.addEventListener('submit', handleSubmit);
nicknameForm.addEventListener('submit', handleNickSubmit);
