import logo from './logo.svg';
import './App.css';
import ShapeViewer from './components/ShapeViewerPage';
import { useState , useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faSave } from '@fortawesome/free-solid-svg-icons';
import NewShapes from './components/NewShapes';


function App() {
    
    const [fileName, setFileName] = useState(""); // State for storing the uploaded file name.
    const [shapes, setShapes] = useState([]); // State to store the array of shapes.
    const sidebarRef = useRef(null); // Create a reference to the element "sidebar"
    const [menuHeight, setMenuHeight] = useState(0);
    useEffect(() => {
        setMenuHeight(sidebarRef.current.offsetHeight);
      }, []);


    // Handling file upload feature
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const parsedShapes = parseShapeFile(content); // Parsing the shape data from the file.
            setShapes(parsedShapes);
            
        };
        reader.readAsText(file);
    };

    // Function to parse shape file and get the shapes
    const parseShapeFile = (content) => {
      const lines = content.split("\n").filter(line => line.trim() !== "");
      return lines.map(line => {
          const parts = line.split(",").map(part => part.trim());
          const type = parts[0].trim(); // First part is the shape type.
  
          if (type.toLowerCase() === "polygon") {
              return {
                  type: "Polygon",
                  points: parts.slice(1, -1).map((value, index) => {
                      // If the value is odd (y-coordinate), leave as is. If even (x-coordinate), convert to number
                      return index % 2 === 0 ? parseInt(value) : parseInt(value);
                  }),
                  color: `#${parts[parts.length - 1].trim()}`,
              };
          } else {
              const [_, x, y, z, width, height, color] = parts; 
              return {  
                  type,
                  x: parseInt(x), // Parse integer values for x, y, width, height.
                  y: parseInt(y),
                  width: parseInt(width),
                  height: parseInt(height),
                  color: `#${color.trim()}`, // Extract color (last part).
              };
          }
      });
  };

    // Function to save the modified shapes to a file
    const handleSaveAs = () => {
      if (shapes.length === 0) {
        alert("No shapes to save!");
        return;
    }

        const fileName = prompt("Enter the desired file name (without extension):", "modified_shapes");
        if (!fileName) return;  // If user cancels or enters an empty name, do nothing

        const fileContent = shapes
            .map((shape) => {
                if (shape.type === "Polygon") {
                    return `Polygon, ${shape.points.join(", ")}, ${shape.color.replace("#", "")}`;
                } else {
                    return `${shape.type}, ${shape.x}, ${shape.y}, 0, ${shape.width}, ${shape.height}, ${shape.color.replace("#", "")}`;
                }
            })
            .join("\n");

        const blob = new Blob([fileContent], { type: "text/plain" }); // creating a Blob from the file content.
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.shapefile`;  // use the user-provided file name with the ".shapefile" extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app">
            <header className="toolbar" id="toolbar">
                <h1>
                  <span className="pulsating-dot"></span>
                  <span className="floating-shape">🔺</span>
                  Shape Viewer
                </h1>
                <div>
                    <label className="upload-btn">
                        {fileName ? fileName : "Open Shape File"}
                        <input type="file" onChange={handleFileUpload} accept=".shapefile" hidden />
                    </label>
                    
                </div>
            </header>

            <div className="container">
                <aside className="sidebar" ref={sidebarRef}>
                    <p onClick={() => document.getElementById("fileInput").click()} style={{ cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: '8px' }} />
                       Open Shape File
                    </p>
                  <input id="fileInput" type="file" onChange={handleFileUpload} accept=".shapefile" hidden />
                    <p onClick={handleSaveAs} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '8px' }} />
                        Save As
                    </p>
                    <NewShapes setShapes={setShapes} /> 
                </aside>

                {/* Pass setShapes to enable dragging */}
                <div id="canvas1">
                <ShapeViewer menuHeight={menuHeight} shapes={shapes} setShapes={setShapes} />
                </div>
                
            </div>
        </div>
    );
}

export default App;

