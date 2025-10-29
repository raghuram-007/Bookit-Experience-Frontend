import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ExperienceDetails from "./pages/ExperienceDetails";
import "./index.css";
import BookingPage from "./pages/BookingPage";
import BookingResult from "./pages/BookingResult";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/experience/:id" element={<ExperienceDetails />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/result" element={<BookingResult />} />
        


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
