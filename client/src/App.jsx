// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import StartLayout from "./layouts/StartLayout";
// import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Start from "./pages/Start/Start";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route element={<StartLayout />}>
          <Route path="/" element={<Start />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
