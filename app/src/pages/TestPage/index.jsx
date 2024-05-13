import React from 'react';
import MenuList from 'components/Menutest';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const TestPage = () => {
  return (
    <div className="TestPage">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/menus" element={<MenuList />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  </div>
  );
};

export default TestPage;
