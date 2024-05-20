import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import storageService from "stores/storage";
import accountService from "api/account";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(storageService.getAccessToken());
  const [account, setAccount] = useState({});
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    fetchAccount();
    fetchPreferences();
  }, [isLogin]); //eslint-disable-line

  const fetchAccount = async () => {
    if (!isLogin) return;

    try {
      const response = await accountService.getInformation();
      const { exitcode, account } = response.data;
      console.log(account);

      if (exitcode === 0) {
        setAccount(account);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPreferences = async () => {
    if (!isLogin) return;

    try {
      const response = await accountService.getPreferences();
      const { exitcode, preferences } = response.data;
      console.log(preferences);
      if (exitcode === 0) {
        setPreferences(preferences);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const login = (token) => {
    storageService.setAccessToken(token);
    setIsLogin(true);
  };

  const logout = () => {
    storageService.removeAccessToken();
    setAccount({});
    setIsLogin(false);
  };

  return (
    <AccountContext.Provider
      value={{
        isLogin,
        account,
        preferences,
        fetchAccount,
        fetchPreferences,
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
