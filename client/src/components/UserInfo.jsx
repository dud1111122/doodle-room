
import React, { useState, useEffect } from "react";

function UserInfo({ setNickname, setIsAdmin }) {
  const [inputName, setInputName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!inputName) {
      const guestId = Math.floor(Math.random() * 10000);
      const guestName = "Guest" + guestId;
      setInputName(guestName);
      setNickname(guestName);
    }
  }, []);

  useEffect(() => {
    if (inputName === "dud1111122") {
      setShowPassword(true);
    } else {
      setShowPassword(false);
      setIsAdmin(false);
    }
    setNickname(inputName);
  }, [inputName]);

  const handlePassword = () => {
    if (password === "0724") {
      setIsAdmin(true);
      alert("관리자 권한이 부여되었습니다.");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="닉네임을 입력하세요"
      />
      {showPassword && (
        <>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <button onClick={handlePassword}>확인</button>
        </>
      )}
    </div>
  );
}

export default UserInfo;
