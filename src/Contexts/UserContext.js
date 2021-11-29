import React, { useState, useEffect, useMemo, useCallback } from "react";
import userService from "./../Services/user.services";

const UserContext = React.createContext();
const TOKEN_KEY = "token";

export const UserProvider = (props) => {
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [role, setRole] = useState(undefined);

  useEffect(() => {
    const verifyTokenAsync = async () => {
      const lsToken = getToken();
      const newRole = getRole();

      if (lsToken) {
        const { username, role } = await userService.verifyToken(lsToken);
        if (username && role) {
          setUser({ username, role });
          setTokenAll(lsToken);
          setRoleAll(role);
          
        }
      }
    };

    verifyTokenAsync();
  }, [token]);



  const setTokenAll = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const setRoleAll = (role) => {
    localStorage.setItem("role_name", role);
    setRole(role);
  }
  const login = useCallback((username, password) => {
    const loginAsync = async () => {
      let status = false;
      try {
        const { token: tokenRes } = await userService.login(username, password);

        if (tokenRes) {
          setTokenAll(tokenRes);
          setRoleAll(role);
          status = true;
        }
      } catch (error) {
        console.error(error);
        console.error("Error in login");
      } finally {
        return status;
      }
    };

    return loginAsync();
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
    setTokenAll(undefined);
    setRoleAll(undefined);
  }, []);

  const value = useMemo(
    () => ({
      token: token,
      user: user,
      login: login,
      logout: logout,
      role: role
    }),
    [token, user, login, logout, role]
  );

  return <UserContext.Provider value={value} {...props} />;
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext() must be inside of UserProvider");
  }

  return context;
};

const getToken = () => localStorage.getItem(TOKEN_KEY);
const getRole = () => localStorage.getItem("role_name");
