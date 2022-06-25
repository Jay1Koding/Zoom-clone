# Zoom

Zoom Clone using Nodejs, WebRTC and WebSockets.

## HTTP vs WebSockets

- HTTP는 stateless

  - request와 response 과정 뒤에 backend는 유저를 기억하지 못함
  - real-time으로 일어나지 않음

- WebSockets
  - 서버가 지원한다면, WebSockets을 사용하고 싶을 경우 wss를 하면 됨
    > ex ) wss://nomadcoders.co/
  - 브라우저와 서버 사이에 bi-directional(양방향) 연결임

## WebSockets in NodeJS

`npm i ws`

[ws: a Node.js WebSocket library](https://www.npmjs.com/package/ws)

- front/ back-end 통신으로 JSON을 이용 // 마치 XML :)
- app.js(front)에선 받은 input value를 JSON.stringify()로 back-end에서 넘겨받음

  > back-end로 javascript object를 보내면 좋지 않음
  > 연결하고 싶은 서버가 javascript 서버가 아닐 수도 있기 떄문
  > 이러한 이유로 string을 보내야함
  > 프로그래밍 언어에만 의존하면 안됨!!!

```javascript
// app.js

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector('input');
  socket.send(makeMessage('nickname', input.value));

  // socket.send({
  //   type: 'nickname',
  //   payload: input.value,
  // });
}
```
