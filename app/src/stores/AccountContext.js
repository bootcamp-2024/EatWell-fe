import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import accountApi from "api/account";
import storageService from "stores/storage";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(storageService.getAccessToken());
  const [account, setAccount] = useState({});
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    fetchAccount();
  }, [isLogin]); //eslint-disable-line

  const fetchAccount = async () => {
    if (!isLogin) return;

    try {
      const response = await accountApi.getInformation();
      const { exitcode, account, preferences } = response.data;
      console.log(account);
      console.log(preferences);
      if (exitcode === 0) {
        setAccount(account);
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
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
