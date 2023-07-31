import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Search from "../components/Search";
import Favourites from "../components/Favourites";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  </Router>
);
