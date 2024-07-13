import React, { useContext } from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./Context/AuthContex";

function App() {
  const {CurrentUser} = useContext(AuthContext)
  console.log(CurrentUser)
  // const ProtectedRoute = ({children})=>{
  //   if(!currentUser){
  //     return <Navigate to="/login"/>
  //   }
  //   return children

  return (
    <BrowserRouter>
   <div className="App">
      <Routes>
        
        <Route element={
      CurrentUser ? <Home/> : <Login/>} path="/"/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Routes>
    </div>
    </BrowserRouter>
 
  );
}

export default App;
