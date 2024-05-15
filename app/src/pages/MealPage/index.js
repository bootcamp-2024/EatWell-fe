import Survey from "components/Survey";
import MealPlanningMainPage from "pages/MealPlanningMainPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const MealPage = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <Routes>
            <Route path="/plan" element={<MealPlanningMainPage />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default MealPage;
