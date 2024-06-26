/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CanvasPage from "./pages/canvaspage";

export default function Routing() {
    const [ifAuthenticated, setIfAuthenticated] = useState(false);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CanvasPage />} />
                {/* <Route path="/" element={ifAuthenticated ? <Dashboard /> : <Login />} /> */}
            </Routes>
        </Router>
    );
}