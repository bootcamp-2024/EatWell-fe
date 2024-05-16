import AccountBar from "components/AccountBar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import UpdateInformationPage from "./UpdateInformationPage";
import UserInformationPage from "./UserInformationPage";
import HealthSettingsPage from "./HealthSettingsPage";

const AccountPage = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <Routes>
              <Route
                exact
                path="/userInformation"
                element={<UserInformationPage />}
              />

              <Route
                exact
                path="/healthSettings"
                element={<HealthSettingsPage />}
              />

              <Route
                exact
                path="/changeInformation"
                element={<UpdateInformationPage />}
              />
            </Routes>
          </div>
          <AccountBar />
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
