import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"
// import Features from "./Features";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/features" element={<Features />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
