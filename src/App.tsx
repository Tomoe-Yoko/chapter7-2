import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Page from "./components/Page";
import Contact from "./components/Contact";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Page />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
