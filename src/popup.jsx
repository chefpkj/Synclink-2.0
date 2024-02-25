import React from "react"
import ReactDom from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import App from "./App";
import './popup.css';



const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <div className="bg-[#161C26]">
      <BrowserRouter>
    <App/>
  </BrowserRouter>

  </div>

);

