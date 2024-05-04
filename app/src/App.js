import React from "react";
import MainPage from "./pages/MainPage";
import config from "./config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.less";
import { AccountProvider } from "stores/AccountContext";

class App extends React.Component {
  render() {
    return (
      <>
        <AccountProvider>
          <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            <MainPage />
          </GoogleOAuthProvider>
        </AccountProvider>
      </>
    );
  }
}

export default App;
