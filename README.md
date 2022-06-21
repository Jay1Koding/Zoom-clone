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
