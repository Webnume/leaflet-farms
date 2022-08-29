import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MyMap from "./components/MyMap";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mymap" element={<MyMap />} />
      </Routes>
    </div>
  );
}

export default App;
