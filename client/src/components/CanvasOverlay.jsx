
import React from "react";

export default function CanvasOverlay({ userCount, color, setColor, isAdmin, handleClear }) {
  const isMobile = window.innerWidth <= 768; // 간단한 반응형 기준

  return (
    <>
      {!isMobile ? (
        // 🖥 데스크톱 UI
        <>
          <div style={{
            position: "absolute",
            left: "20px",
            top: "80px",
            background: "rgba(255,255,255,0.8)",
            padding: "10px 15px",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            fontWeight: "bold",
            zIndex: 2
          }}>
            👥 접속자: {userCount}명
          </div>

          <div style={{
            position: "absolute",
            right: "320px",
            top: "20px",
            background: "rgba(255,255,255,0.8)",
            padding: "10px",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 2
          }}>
            <label>🎨 색상:</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            {isAdmin && (
              <button
                onClick={handleClear}
                style={{
                  padding: "5px 10px",
                  background: "#ff4d4d",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                초기화
              </button>
            )}
          </div>
        </>
      ) : (
        // 📱 모바일 UI
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.9)",
          padding: "10px 12px",
          borderRadius: "16px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          zIndex: 2
        }}>
          <span style={{ fontSize: "14px" }}>👥 {userCount}명</span>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          {isAdmin && (
            <button
              onClick={handleClear}
              style={{
                padding: "5px 10px",
                background: "#ff4d4d",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "12px"
              }}
            >
              초기화
            </button>
          )}
        </div>
      )}
    </>
  );
}
