
import React, { useEffect, useRef, useState } from "react";
import socket from "../socket";
import CanvasOverlay from "./CanvasOverlay";

export default function CanvasBoard({ nickname, isAdmin }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [prev, setPrev] = useState({ x: null, y: null });
  const [color, setColor] = useState("#000000");
  const [userCount, setUserCount] = useState(1);

  // 📱 모바일 대응을 위한 위치 계산 함수
  const getPointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    socket.emit("join", { nickname, isAdmin });

    socket.on("userCount", (count) => setUserCount(count));
    socket.on("draw", ({ x1, y1, x2, y2, color }) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });

    socket.on("clearCanvas", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off("userCount");
      socket.off("draw");
      socket.off("clearCanvas");
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const startDraw = (e) => {
    const { x, y } = getPointerPos(e);
    setPrev({ x, y });
    setDrawing(true);
  };

  const stopDraw = () => setDrawing(false);

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPointerPos(e);

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit("draw", {
      x1: prev.x,
      y1: prev.y,
      x2: x,
      y2: y,
      color,
    });

    setPrev({ x, y });
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("clearCanvas");
  };

  return (
    <div>
      {/* 🎨 캔버스 배경색은 여기서 설정 */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseUp={stopDraw}
        onMouseMove={draw}
        onTouchStart={startDraw}    // 📱 모바일 터치 대응
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        style={{
          display: "block",
          cursor: "crosshair",
          backgroundColor: "#fdfdfd"  // 🎨 여기서 배경색 바꾸면 됨
        }}
      />
      <CanvasOverlay
        userCount={userCount}
        color={color}
        setColor={setColor}
        isAdmin={isAdmin}
        handleClear={handleClear}
      />
    </div>
  );
}
