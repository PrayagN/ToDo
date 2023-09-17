import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Background from "./Background";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
         <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%'}}>
        <Background />
      </div>
      <App />
  </React.StrictMode>
);
