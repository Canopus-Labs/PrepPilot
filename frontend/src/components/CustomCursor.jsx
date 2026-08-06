import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("Default");
  const [isOpen, setIsOpen] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const computedCursor = window.getComputedStyle(target).cursor;
      const isClickable =
        computedCursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("button") ||
        target.closest("a");

      setIsPointer(Boolean(isClickable));

      if (cursorStyle === "Trail" || cursorStyle === "Sparkle") {
        setTrail((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id: Date.now() }]);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, cursorStyle]);

  if (!isVisible) return null;

  return (
    <>
      {/* Selection Dropdown UI Panel */}
      <div className="fixed bottom-6 right-6 z-[9999] font-sans">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-48 px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 rounded-lg shadow-xl backdrop-blur-md transition-all text-sm font-medium"
          >
            <span>Cursor: {cursorStyle}</span>
            <span className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
              &gt;
            </span>
          </button>

          {isOpen && (
            <div className="absolute bottom-full mb-2 w-full bg-slate-900/95 border border-slate-700 rounded-lg shadow-2xl backdrop-blur-md overflow-hidden py-1">
              {["Default", "Glow", "Trail", "Sparkle", "Orbit"].map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setCursorStyle(style);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    cursorStyle === style
                      ? "bg-violet-600/30 text-violet-300 font-semibold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Render Active Cursor Styles (Default returns null to show normal system cursor arrow) */}
      {cursorStyle === "Glow" && (
        <div
          className="fixed pointer-events-none z-[9998] rounded-full transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-400/30 blur-md transition-all duration-75"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
      )}

      {cursorStyle === "Trail" && (
        <>
          <div
            className="fixed pointer-events-none z-[9998] w-3 h-3 bg-violet-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          />
          {trail.map((pt, index) => (
            <div
              key={pt.id}
              className="fixed pointer-events-none z-[9997] w-2 h-2 bg-violet-400/40 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${pt.x}px`,
                top: `${pt.y}px`,
                opacity: index / trail.length,
              }}
            />
          ))}
        </>
      )}

      {cursorStyle === "Sparkle" && (
        <>
          <div
            className="fixed pointer-events-none z-[9998] w-4 h-4 bg-yellow-400 rounded-sm rotate-45 transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(250,204,21,0.8)]"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          />
          {trail.map((pt, index) => (
            <div
              key={pt.id}
              className="fixed pointer-events-none z-[9997] w-1.5 h-1.5 bg-yellow-300/60 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pt.x}px`, top: `${pt.y}px` }}
            />
          ))}
        </>
      )}

      {cursorStyle === "Orbit" && (
        <div
          className="fixed pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-dashed border-pink-500 rounded-full animate-spin"
          style={{ left: `${position.x}px`, top: `${position.y}px`, animationDuration: "3s" }}
        />
      )}
    </>
  );
};

export default CustomCursor;