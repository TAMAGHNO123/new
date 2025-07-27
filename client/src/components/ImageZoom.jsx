import React, { useState } from "react";

export default function ImageZoom({ images = [] }) {
  const [main, setMain] = useState(images[0] || "");
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [modal, setModal] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div>
      {/* Main Image with Zoom */}
      <div
        className="relative w-full max-w-md mx-auto aspect-square border rounded-lg overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setModal(true)}
        style={{ background: "#f9fafb" }}
      >
        <img
          src={main}
          alt="Product"
          className="w-full h-full object-contain select-none"
          draggable={false}
        />
        {zoom && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${main})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: "200%",
              opacity: 0.7,
              border: "2px solid #e5e7eb",
              zIndex: 10,
            }}
          />
        )}
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 justify-center">
        {images.map((img, i) => (
          <button
            key={img}
            className={`w-16 h-16 rounded border-2 ${main === img ? "border-blue-500" : "border-gray-200"} overflow-hidden`}
            onClick={() => setMain(img)}
            type="button"
          >
            <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      {/* Modal Fullscreen Viewer */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setModal(false)}
        >
          <img
            src={main}
            alt="Full"
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}