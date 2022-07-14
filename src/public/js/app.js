const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector('input');
  // 3번째 인자를 서버로 넘겨서 콜백함
  socket.emit('enter_room', { payload: input.value }, () => {
    console.log('server is done!');
  });
  input.value = '';
}

form.addEventListener('submit', handleRoomSubmit);
