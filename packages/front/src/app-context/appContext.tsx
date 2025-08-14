import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo
} from 'react';
import { useAuth, loginFuncType, logoutFuncType } from '../hooks/auth-hook';
import { NotificationProps as CoreNotificationProps } from '@lp/ui';
import { Language } from '../generated/graphql';
import { getStoredData, storeData } from '../util/localStorageUtils';

interface NotificationProps extends CoreNotificationProps {
  targetLocation?: string;
}

type Context = {
  login: loginFuncType;
  logout: logoutFuncType;
  userId?: string | null;
  token?: string | null;
  notification?: NotificationProps;
  setNotification: (notification?: NotificationProps) => void;
  language: Language;
  isDevEnv?: boolean;
  isDemo?: boolean;
  saveLanguage: (lang: Language) => void;
};

export const AppContext: React.Context<Context> = createContext({} as Context);

export const AppProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { userId, token, login, logout } = useAuth();
  const [language, setLanguage] = useState<Language>(Language.English);
  const [notification, setNotification] = useState<
    NotificationProps | undefined
  >();

  useEffect(() => {
    const storedLanguage = getStoredData('language');
    const lang: Language = storedLanguage || Language.English;
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  const saveLanguage = (lang: Language) => {
    storeData('language', lang);
    setLanguage(lang);
  };

  const isDevEnv = useMemo(() => process?.env?.NODE_ENV !== 'production', []);
  const isDemo = useMemo(() => process?.env?.DEMO_VERSION === 'true', []);

  const value: Context = useMemo(
    () => ({
      login,
      logout,
      userId,
      token,
      notification,
      setNotification,
      language,
      saveLanguage,
      isDevEnv,
      isDemo
    }),
    [token, language, userId, notification, isDevEnv, isDemo]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
