import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "components/Header";
import LandingPage from "pages/LandingPage";
import Footer from "components/Footer";
import LoginPage from "pages/LoginPage";
import SignupPage from "pages/SignupPage";

import NotFoundPage from "pages/NotFoundPage";
import ServerErrorPage from "pages/ServerErrorPage";

const MainPage = () => {
  return (
    <div className="MainDiv">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/error" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default MainPage;
