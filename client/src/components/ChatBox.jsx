import React, { useEffect, useRef } from "react";
import socket from "../socket";

function ChatBox({ nickname }) {
  const chatRef = useRef(null);

  useEffect(() => {
    socket.on("chatMessage", ({ nickname, message }) => {
      const chatBox = chatRef.current;
      if (chatBox) {
        const p = document.createElement("p");
        p.innerText = `${nickname}: ${message}`;
        p.style.margin = "2px 0";           // 📏 더 좁은 간격
        p.style.fontSize = "14px";          // 📐 작은 글씨
        chatBox.appendChild(p);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const input = e.target.elements.msg;
    const message = input.value;
    if (message.trim() !== "") {
      socket.emit("chatMessage", { nickname, message });
      input.value = "";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "300px",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        overflowY: "auto",
        padding: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        gap: "3px"  // 줄 간격 최소화
      }}
      ref={chatRef}
    >
      <form onSubmit={sendMessage}>
        <input type="text" name="msg" placeholder="메시지 입력" style={{ width: "80%" }} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default ChatBox;
