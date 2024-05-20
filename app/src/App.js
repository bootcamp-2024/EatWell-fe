import React from "react";
import DashboardPage from "./pages/Dashboard";
import MealPlanPage from "./pages/MealPlanPage";

import config from "./config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AccountProvider } from "stores/AccountContext";

class App extends React.Component {
  render() {
    return (
      <>
        <AccountProvider>
          <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            {/* <DashboardPage /> */}
            <MealPlanPage/>
          </GoogleOAuthProvider>
        </AccountProvider>
      </>
    );
  }
}

export default App;
