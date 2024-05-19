import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardIframe from "./DashboardIframe";

const Analysis = () => {
  return (
    <div>
      <main>
        <DashboardIframe />
      </main>
    </div>
  );
};

export default Analysis;
