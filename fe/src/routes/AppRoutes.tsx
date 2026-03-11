import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Documents from "../pages/Dashboard/Documents";
import DocumentEditor from "../pages/Editor/DocumentEditor";


export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/documents" element={<Documents/>}></Route>
                <Route path="/documents/:id" element={<DocumentEditor/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}