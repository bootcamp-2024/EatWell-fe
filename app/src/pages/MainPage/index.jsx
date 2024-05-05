import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "components/Header";
import Footer from "components/Footer";
import Login from "components/Login";
import Verification from "components/Verification";
import HomePage from "pages/HomePage";
import ServerError from "components/ServerError";
import NotFound from "components/NotFound";
import SignUp from "components/SignUp";

const MainPage = () => {
  return (
    <div className="MainDiv">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/verify/:token" element={<Verification />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default MainPage;
