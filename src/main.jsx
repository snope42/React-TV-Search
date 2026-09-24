import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./Home.jsx";
import Details from "./Details.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type/:id" element={<Details />} />
        </Routes>
    </BrowserRouter>
);
