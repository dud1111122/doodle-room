
import React, { useState } from "react";
import CanvasBoard from "./components/CanvasBoard";
import ChatBox from "./components/ChatBox";
import UserInfo from "./components/UserInfo";

function App() {
  const [nickname, setNickname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <UserInfo setNickname={setNickname} setIsAdmin={setIsAdmin} />
      <CanvasBoard nickname={nickname} isAdmin={isAdmin} />
      <ChatBox nickname={nickname} />
    </div>
  );
}

export default App;
