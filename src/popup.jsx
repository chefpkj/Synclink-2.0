import React from "react"
import {render} from "react-dom";
import { createBrowserRouter,Outlet,RouterProvider} from "react-router-dom";
import Login from "./components/Login";


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
        </div>
    )
}

render(<Popup/>, document.getElementById("react-target"));