import React, { createContext, useState, useEffect, useContext } from "react";

import { apiAlligator, apiHireme } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await localStorage.getItem("@hireme:profile");
      const storageToken = await localStorage.getItem("@hireme:token");
      console.log(storageUser);
      console.log(storageToken);
      if (storageUser && storageToken) {
        apiHireme.defaults.headers.Authorization = `Bearer ${storageToken}`;

        setUser(JSON.parse(storageUser));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
    loadStorageData();
  }, []);

  async function signIn(email, password) {
    console.log(email);
    console.log(password);
    // const response = await auth.signIn();

    const response = await apiAlligator.post("/authentication", {
      email: email,
      password: password,
    });
    console.log(response);

    apiHireme.defaults.headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
    const response_hireme = await apiHireme.post("/me/login", {
      clientToken: response.data.accessToken,
      loginProvider: "ISIP",
    });
    console.log(response_hireme);

    setUser(response_hireme.data);

    apiHireme.defaults.headers.Authorization = `Bearer ${response_hireme.data.jwtToken}`;

    await localStorage.setItem(
      "@hireme:id",
      JSON.stringify(response_hireme.data.id)
    );
    await localStorage.setItem(
      "@hireme:profile",
      JSON.stringify(response_hireme.data.profile)
    );
    await localStorage.setItem("@hireme:token", response_hireme.data.jwtToken);
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
