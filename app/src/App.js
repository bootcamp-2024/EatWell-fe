import React from "react";
import TestPage from "./pages/TestPage";
import MainPage from "./pages/MainPage";
import CalendarPage from "pages/CalendarPage";
import config from "./config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AccountProvider } from "stores/AccountContext";

class App extends React.Component {
  render() {
    return (
      <>
        <AccountProvider>
          <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            {/* <CalendarPage /> */}
            <TestPage />
          </GoogleOAuthProvider>
        </AccountProvider>
      </>
    );
  }
}

export default App;
