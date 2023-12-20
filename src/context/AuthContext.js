import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const LoginContext = createContext();

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  result = JSON.stringify(result);
  return result;
}

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isProfileValid, setIsProfileValid] = useState(false);

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
      await checkProfileValid();
      setUserInfo(value);
    } catch (error) {
      throw error;
    }
  }

  async function LogoutAction() {
    try {
      await SecureStore.deleteItemAsync("loginInfo");
      await SecureStore.deleteItemAsync("profileValid");

      const valid = await SecureStore.getItemAsync("profileValid");

      console.log(valid);
      setIsLoggedIn(false);
    } catch (error) {
      throw error;
    }
  }

  async function checkProfileValid(access_token, role) {
    console.log("abc");
    if (!access_token) {
      if (!userInfo) return;
      access_token = userInfo.access_token;
      role = userInfo.role;
    }

    try {
      const valid = await SecureStore.getItemAsync("profileValid");

      console.log(valid, "<<<<");

      if (valid) {
        console.log("auto");
        setIsProfileValid(true);
      } else {
        try {
          let url = BASE_URL;

          if (role === "player") {
            url = `${url}/profile`;
          } else if (role === "field") {
            url = `${url}/admin/profile`;
          }

          const {
            data: { data },
          } = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + access_token,
            },
          });

          if (role === "player" && !data.user.name) {
            return setIsProfileValid(false);
          }

          if (role === "field" && !data.field.name) {
            return setIsProfileValid(false);
          }

          await SecureStore.setItemAsync("profileValid", "true");
          setIsProfileValid(true);
        } catch (error) {
          setIsProfileValid(false);
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    getValueFor("loginInfo").then((data) => {
      if (data === "null") return;

      if (data) {
        data = JSON.parse(JSON.parse(data));

        setIsLoggedIn(true);
        setUserInfo(data);

        checkProfileValid(data.access_token, data.role);
      }
    });
  }, []);

  return (
    <LoginContext.Provider value={{ userInfo, loginInfo, isLoggedIn, setIsLoggedIn, LoginAction, LogoutAction, isProfileValid, checkProfileValid }}>
      {children}
    </LoginContext.Provider>
  );
};
