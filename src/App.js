import React from "react";
import { Routes, Route } from "react-router-dom";
import Posts from "./menuPage/Menu";
import Cart from "./menuPage/Cart";
import Detail from "./menuPage/Dtail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Detail" element={<Detail />} />
        </Routes>
    );
}



export default App;
