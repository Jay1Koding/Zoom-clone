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

## SocketIO vs WebSockets

[SockIO](https://socket.io/docs/v4/)

> install SocketIO
> npm i socket.io
> Socket.io 에서 url을 제공해줌
> [Socket.IO](http://localhost:3000/socket.io/socket.io.js)
> SocketIO는 WebSocket의 부가기능이 아니기에 제공받음
> WebSocket API는 브라우저에 설치되있으나 SocketIO는 Client도 다운을 받을 필요가 있음

```pug
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible", content="IE=edge")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Zoom
        link(rel="stylesheet", href="https://unpkg.com/mvp.css")
    body
        header
            h1 ZOOM
        main

    //- here
    script(src="/socket.io/socket.io.js")
    script(src="/public/js/app.js")
```

## Socket.io

- socket.io에서 client는 어떠한 event든 emit할 수 있게 해줌
- string 뿐만 아니라 다른 타입으로도 보낼 수 있음
- 인자를 제한없이 보낼 수 있음
- 인자의 마지막에 함수로 콜백할 수 있음
  - 보안상의 문제로 백엔드는 프론트엔드에서 오는 코드를 실행시킴 안됨
  - 프론트 엔드에 있는 function을 백엔드에서 실행시켜줌
    - 인자도 전달해줌

## Server API

[Server API](https://socket.io/docs/v4/server-api/)

## Adapter

[Mongo Adapter](https://socket.io/docs/v4/mongo-adapter/)
