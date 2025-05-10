import { io } from "socket.io-client";

// 환경에 따라 서버 주소 다르게 설정
const BACKEND_URL = import.meta.env.PROD
  ? "https://doodle-room-2.onrender.com"     // ✅ 배포용 주소
  : "http://localhost:3000";                 // ✅ 로컬 개발용 주소

const socket = io(BACKEND_URL, {
  transports: ['websocket'],
});

export default socket;
