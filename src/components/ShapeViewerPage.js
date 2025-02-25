import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, RegularPolygon, Line } from "react-konva";

const ShapeViewer = ({ menuHeight, shapes, setShapes }) => {

  // Initialize canvas size based on window width and menu height
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth * 0.79, height: menuHeight  });
  useEffect(() => {
    if (shapes.length === 0) return;  // Exit if no shapes exist

    let maxX = 0, maxY = 0;
    // Determine the maximum x and y coordinates from all shapes
    shapes.forEach((shape) => {
      if (shape.type === "Rectangle" || shape.type === "Triangle") {
        maxX = Math.max(maxX, shape.x + shape.width);
        maxY = Math.max(maxY, shape.y + shape.height);
      } else if (shape.type === "Polygon") {
        for (let i = 0; i < shape.points.length; i += 2) {
          maxX = Math.max(maxX, shape.points[i]);
          maxY = Math.max(maxY, shape.points[i + 1]);
        }
      }
    });
    // Update canvas size dynamically
    setCanvasSize({ width: window.innerWidth * 0.79, height: menuHeight });
  }, [shapes]);

   // Function to handle shape dragging and update position
  const handleDragMove = (index, e) => {
    const { x, y } = e.target.position();
    setShapes((prevShapes) => {
      const updatedShapes = [...prevShapes];
      updatedShapes[index] = { ...updatedShapes[index], x, y };
      return updatedShapes;
    });
  };

  return (
    <Stage width={canvasSize.width} height={canvasSize.height} style={{ border: "1px solid black" }}>
      <Layer>
        {shapes.map((shape, index) => {
          // Rendering Rectangle
          if (shape.type === "Rectangle") {
            return (
              <Rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.color}
                draggable
                onDragMove={(e) => handleDragMove(index, e)}
              />
            );
            // Rendering Triangle (as a RegularPolygon with 3 sides)
          } else if (shape.type === "Triangle") {
            return (
              <RegularPolygon
                key={index}
                x={shape.x}
                y={shape.y}
                sides={3}
                radius={Math.max(shape.width, shape.height) / 2}
                fill={shape.color}
                draggable
                onDragMove={(e) => handleDragMove(index, e)}
              />
            );
            // Rendering Polygon (as a closed Line)
          } else if (shape.type === "Polygon") {
            return (
              <Line
                key={index}
                points={shape.points} // Points should be a flat array
                closed
                fill={shape.color}
                stroke="black"
                strokeWidth={2}
                draggable
                onDragMove={(e) => handleDragMove(index, e)}
              />
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
};

export default ShapeViewer;
