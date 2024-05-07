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
import Calendar from 'components/Calendar';

const CalendarPage = () => {
  return (
    <div className="CalendarPage">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/calendar" element={<Calendar />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default CalendarPage;
