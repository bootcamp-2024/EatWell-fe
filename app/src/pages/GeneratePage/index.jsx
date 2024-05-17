import React from 'react';
import Generate from 'components/Generate';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const GeneratePage = () => {
  return (
    <div className="GeneratePage">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/generate" element={<Generate />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
};

export default GeneratePage;
