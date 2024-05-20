import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Login from 'components/Login';
import Verification from 'components/Verification';
import HomePage from 'pages/HomePage';
import ServerError from 'components/ServerError';
import NotFound from 'components/NotFound';
import SignUp from 'components/SignUp';
import Mealplan from 'components/MealPlan';

const MealPlanPage = () => {
  return (
    <div className="MealPlanPage">
      <BrowserRouter>
        <Routes>
          <Route exact path="/meal" element={<Mealplan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MealPlanPage;
