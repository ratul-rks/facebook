import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements( 
      <Route>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      </Route>
    )
  );
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router}/>
    </>
  );
}

export default App
