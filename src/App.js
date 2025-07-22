import React from "react";
import {Routes, Route } from "react-router-dom";
import Watchlist from "./pages/Watchlist";
import SignIn from "./pages/SignIn";

function App() {
  return (
    

      <Routes>
        <Route path="/" element={<Watchlist />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    
  );
}

export default App;

