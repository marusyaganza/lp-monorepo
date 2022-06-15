import React, { createContext, PropsWithChildren } from 'react';
import { useAuth, loginFuncType, logoutFuncType } from '../hooks/auth-hook';

type Context = {
  login: loginFuncType;
  logout: logoutFuncType;
  userId?: string | null;
  token?: string | null;
};

export const AppContext: React.Context<Context> = createContext({} as Context);

export const AppProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { userId, token, login, logout } = useAuth();

  const value: Context = {
    login,
    logout,
    userId,
    token
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
