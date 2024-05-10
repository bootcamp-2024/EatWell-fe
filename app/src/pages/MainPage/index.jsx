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
import MealPlanningMainPage from "pages/MealPlanningMainPage";
import { AccountContext } from "stores/AccountContext";
import PrivateRoute from "pages/PrivateRoute";

const MainPage = () => {
  const { isLogin } = useContext(AccountContext);
  const displayHeader = !window.location.pathname.startsWith("/meal");
  return (
    <div className="MainDiv">
      <BrowserRouter>
        {displayHeader && <Header />}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/verify/:token" element={<Verification />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            path="/meal/*"
            element={
              <PrivateRoute auth={isLogin} redirectTo="/login">
                <MealPlanningMainPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default MainPage;
