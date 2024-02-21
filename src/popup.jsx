import React from "react"
import ReactDom from "react-dom/client";
import { createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
import Login from "./components/Login";
import App from "./App.js";


const Applayout=()=>{
    return (
          <Outlet/>
    )
}

const appRouter=createBrowserRouter([
   
    { path:"/",
    element:<Applayout/>,
    children:[
       {
          path:"/",
          element:<Login/>
       }
    //    ,
    //   {
    //      path:"/home",
    //      element:<Body/>
    //   },
    //   {
    //      path:"/addItems",
    //      element:<AddItems/>
    //   },
    //   {
    //    path:"/link/:id",
    //    element:<UpdateItem/>
    //   }
     ]
    
 }
 ]);

function Popup(){
    return (
        <div>
        <h1>Hello, worldsss</h1>
        <p>This is a simple popup</p>
        <App/>
        </div>
    )
}
const root=ReactDom.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={appRouter}/>);
root.render(<Popup/>);
