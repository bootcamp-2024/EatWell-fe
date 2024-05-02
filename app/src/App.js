import React from "react";
import MainPage from "./pages/MainPage";
import config from "./config/config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.less";

class App extends React.Component {
  render() {
    return (
      <>
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
          <MainPage />
        </GoogleOAuthProvider>
      </>
    );
  }
}

export default App;
