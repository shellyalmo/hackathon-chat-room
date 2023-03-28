import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Chat from "./Chat";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";


const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,    
  },
  {
    path: "/chat",
    element: <Chat/>,
  }

]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={route}/>
      {/* <Chat /> */}
    </div>
  );
}

export default App;
