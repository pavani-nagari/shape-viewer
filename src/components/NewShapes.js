import React, { useState } from "react";

const NewShapes = ({ setShapes }) => {
    const [shapeType, setShapeType] = useState("Rectangle");
    const [width, setWidth] = useState(50);
    const [height, setHeight] = useState(50);
    const [x, setX] = useState(100);
    const [y, setY] = useState(100);
    const [color, setColor] = useState("#B9AA88");
    const [numSides, setNumSides] = useState(3); // Default to triangle (3 sides)

    // Function to generate polygon points based on width, height, and number of sides
    const generatePolygonPoints = (cx, cy, w, h, sides) => {
        const points = [];
        const rx = w / 2; // Horizontal radius
        const ry = h / 2; // Vertical radius

        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const px = cx + rx * Math.cos(angle);
            const py = cy + ry * Math.sin(angle);
            points.push(px, py);
        }
        return points;
    };

    const addShape = () => {
        const newShape = {
            type: shapeType,
            x,
            y,
            width,
            height,
            color,
            points: shapeType === "Polygon" ? generatePolygonPoints(x, y, width, height, numSides) : null,
        };
        setShapes((prevShapes) => [...prevShapes, newShape]);
    };

    return (
        <div className="shape-controls">
            <h3>Create Shape</h3>

            <label>Type:</label>
            <select value={shapeType} onChange={(e) => setShapeType(e.target.value)}>
                <option value="Rectangle">Rectangle</option>
                <option value="Triangle">Triangle</option>
                <option value="Polygon">Polygon</option>
            </select>

            {shapeType === "Polygon" && (
                <>
                    <label>Number of Sides:</label>
                    <input
                        type="number"
                        min="3"
                        max="10"
                        value={numSides}
                        onChange={(e) => setNumSides(parseInt(e.target.value))}
                    />
                </>
            )}

            <label>Width:</label>
            <input type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} />

            <label>Height:</label>
            <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} />

            <label>X:</label>
            <input type="number" value={x} onChange={(e) => setX(parseInt(e.target.value))} />

            <label>Y:</label>
            <input type="number" value={y} onChange={(e) => setY(parseInt(e.target.value))} />

            <label>Color:</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

            <button onClick={addShape}>Add Shape</button>
        </div>
    );
};

export default NewShapes;
