import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const Canvas = () => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedColor, setSelectedColor] = useState("black");
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [isCursorMove, setIsCursorMove] = useState(false);  

  const handleSelectShape = (shapeType) => {
    setSelectedShape(shapeType);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handleCanvasMouseDown = (e) => {
    if (selectedShape) {
      setIsDrawing(true);
      setIsCursorMove(true);
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;
      setStartPosition({ x, y });
      setCurrentPosition({ x, y });
    }
  };

  const handleCanvasMouseLeave = () => {
    setIsCursorMove(false);
  };

  const handleCanvasMouseMove = (e) => {
    if (isDrawing && selectedShape) {
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;
      setCurrentPosition({ x, y });
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing && selectedShape) {
      setIsDrawing(false);
      setIsCursorMove(false); 
      const width = Math.abs(currentPosition.x - startPosition.x);
      const height = Math.abs(currentPosition.y - startPosition.y);
      setShapes((prevShapes) => [
        ...prevShapes,
        {
          type: selectedShape,
          position: {
            x: Math.min(startPosition.x, currentPosition.x),
            y: Math.min(startPosition.y, currentPosition.y),
          },
          size: { width, height },
          color: selectedColor, 
        },
      ]);
    }
  };

  return (
    <>
      <div>
        <Navbar onSelectShape={handleSelectShape} onSelectColor={handleSelectColor} />
      </div>
      <div
        className="h-screen overflow-hidden"
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseLeave}
        style={{ position: "relative", cursor: isCursorMove ? "move" : "default" }}
      >
        {shapes.map((shape, index) => {
          let renderedShape = null;
          switch (shape.type) {
            case "square":
              renderedShape = (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: shape.position.x,
                    top: shape.position.y,
                    width: shape.size.width,
                    height: shape.size.height,
                    border: `1px solid ${shape.color}`, 
                    pointerEvents: "none",
                  }}
                ></div>
              );
              break;
            case "rounded-square":
              renderedShape = (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: shape.position.x,
                    top: shape.position.y,
                    width: shape.size.width,
                    height: shape.size.height,
                    border: `1px solid ${shape.color}`, 
                    borderRadius: "10px", 
                    pointerEvents: "none",
                  }}
                ></div>
              );
              break;
            case "circle":
              renderedShape = (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: shape.position.x,
                    top: shape.position.y,
                    width: shape.size.width,
                    height: shape.size.height,
                    border: `1px solid ${shape.color}`, 
                    borderRadius: "50%", 
                    pointerEvents: "none",
                  }}
                ></div>
              );
              break;
            default:
              renderedShape = null;
          }
          return renderedShape;
        })}
        {isDrawing && selectedShape && (
          <div
            style={{
              position: "absolute",
              left: startPosition.x,
              top: startPosition.y,
              width: Math.abs(currentPosition.x - startPosition.x),
              height: Math.abs(currentPosition.y - startPosition.y),
              border: `1px solid ${selectedColor}`, 
              pointerEvents: "none",
              borderRadius:
                selectedShape === "circle" ? "50%" : "none", 
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default Canvas;
