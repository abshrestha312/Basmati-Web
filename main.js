import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Cafe from "./Pages/Cafe";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Deals from "./Pages/Deals";
import Recipes from "./Pages/Recipes";
import Admin from "./Pages/Admin";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="cafe" element={<Cafe />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="deals" element={<Deals />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
