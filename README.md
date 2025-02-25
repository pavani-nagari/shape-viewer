The README.pdf file and 5 sample test files with .shapefile extension are in the public folder.
The project is hosted on Versel. You can find it in the link "https://shape-viewer-rust.vercel.app/"
You can view the project on my github too "https://github.com/pavani-nagari/shape-viewer"

Instructions to Run the Application
1. Extract the contents of the provided .zip file.
2. Navigate to the project directory in your terminal.
3. Run npm install to install the required dependencies.
4. Run npm start to start the development server.
5. Open your web browser and navigate to http://localhost:3000.

# Shape Viewer 🖼️

## Overview 🌟

**Shape Viewer** is a browser-based single-page application that allows users to import and render two-dimensional shapes from a custom text-based file format. Built with React and powered by the Konva library, the app efficiently renders shapes on a canvas for an interactive experience. 🚀

## Features 🎨

- **Shape File Import:** 🗂️ Easily load `.shapefile` files through the "Open Shape File" button in the top toolbar or left menu.
- **Shape Rendering:** 🎭 Renders rectangles, triangles, and polygons based on the data provided in the shape file.
- **Custom Shape File Format:** 📄 Supports a simple, human-readable, text-based file format to define shapes.
- **Shape Creation:** ✏️ Create new shapes (rectangles, triangles, and polygons) with specified dimensions, positions, and colors directly from the left menu.
- **Shape Translation:** ↔️ Drag and reposition shapes within the viewport to customize their placement.
- **Save As:** 💾 Save your modified shape configurations to a new `.shapefile`.
- **UI Enhancement:** 🌈 A modern, visually appealing, and user-friendly interface that follows current industry standards.

## Technologies Used 💻

- **React:** ⚛️ A powerful JavaScript library for building user interfaces.
- **Konva:** 🎨 A 2D JavaScript canvas library for drawing complex shapes and handling events.
- **Font Awesome:** 🎯 For beautiful icons in the user interface.
- **CSS:** 🎨 Styling the application for a polished and modern look.

## Project Structure 📂

The project is structured as follows:

- `src/`: Contains the source code of the application.
    - `App.js`: 🏠 The main component that handles the UI and data flow.
    - `components/`: 🧩 Contains reusable React components.
        - `ShapeViewerPage.js`: 🖼️ Displays the shapes on a Konva canvas.
        - `NewShapes.js`: 🖌️ UI for creating new shapes.
    - `App.css`: 💅 Styling for the application.
    - `index.js`: 📝 The entry point for the React application.

## Shape File Format 📑

**Shape Viewer** uses a custom text-based file format with the `.shapefile` extension. Each line in the file represents a shape, defined with comma-separated values.

### Supported Shapes 🏷️

- **Rectangle**
-  x`, `y`: Top-left corner coordinates.
- `z`: Z-index (currently not used).
- `width`: Width of the rectangle.
- `height`: Height of the rectangle.
- `color`: Hex color code (e.g., `#ff0000` for red).

- **Triangle:**
- `x`, `y`: Top-left corner coordinates.
- `z`: Z-index (currently not used).
- `width`: Width of the triangle.
- `height`: Height of the triangle.
- `color`: Hex color code (e.g., `#ff0000` for red).

- **Polygon:**
- `x1, y1, x2, y2, ..., xn, yn`: Coordinates of the polygon’s vertices.
- `color`: Hex color code (e.g., `#ff0000` for red).

### Example Shape File 📄
Rectangle, 10, 20, 0, 100, 200, ff0000 
Triangle, 150, 250, 0, 120, 180, 00ff00 
Polygon, 300, 350, 400, 450, 500, 350, 600, 400, 0000ff




