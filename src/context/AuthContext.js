import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext();

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  result = JSON.stringify(result);
  return result;
}

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  async function LoginAction() {
    try {
      setIsLoggedIn(true);
    } catch (error) {
      throw error;
    }
  }
  async function loginInfo(value) {
    try {
      await SecureStore.setItemAsync("loginInfo", JSON.stringify(value));
      setUserInfo(value);
    } catch (error) {
      throw error;
    }
  }

  async function LogoutAction() {
    try {
      await SecureStore.deleteItemAsync("loginInfo");
      setIsLoggedIn(false);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getValueFor("loginInfo").then((data) => {
      if (data) {
        setIsLoggedIn(true)
        setUserInfo(JSON.parse(JSON.parse(data)));
      }
    });
  }, []);

  return (
    <LoginContext.Provider value={{ userInfo, loginInfo, isLoggedIn, setIsLoggedIn, LoginAction, LogoutAction }}>{children}</LoginContext.Provider>
  );
};
