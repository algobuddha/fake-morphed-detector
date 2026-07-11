import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Result from "../pages/Result";
import About from "../pages/About";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/result" element={<Result />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}