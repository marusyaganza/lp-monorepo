import React, { createContext, PropsWithChildren, useState } from 'react';
import { useAuth, loginFuncType, logoutFuncType } from '../hooks/auth-hook';
import { NotificationProps } from '@lp/ui';

type Context = {
  login: loginFuncType;
  logout: logoutFuncType;
  userId?: string | null;
  token?: string | null;
  notification?: NotificationProps;
  setNotification: (notification?: NotificationProps) => void;
};

export const AppContext: React.Context<Context> = createContext({} as Context);

export const AppProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { userId, token, login, logout } = useAuth();
  const [notification, setNotification] = useState<
    NotificationProps | undefined
  >();

  const value: Context = {
    login,
    logout,
    userId,
    token,
    notification,
    setNotification
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
