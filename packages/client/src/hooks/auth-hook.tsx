import { useState, useCallback, useEffect } from 'react';
import { getStoredData, storeData } from '../util/localStorageUtils';
import { createAuthLink, client } from '../ApolloClient';
export type loginFuncType = (
  id: string,
  tokenString: string,
  expirationDate?: Date
) => void;

export type logoutFuncType = () => void;

let logoutTimer: NodeJS.Timeout | undefined;

const tokenTTL = Number.parseInt(import.meta.env.VITE_TOKEN_TTL || '7');

const TOKEN_EXPIRATION_PERIOD =
  new Date().getTime() + 1000 * 60 * 60 * 24 * tokenTTL;

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>();
  const [token, setToken] = useState<string | null>();
  const [tokenExpDate, setTokenExpDate] = useState<Date | null>();

  const login: loginFuncType = useCallback(
    (id, tokenString, expirationDate) => {
      setUserId(id);
      setToken(tokenString);
      const tokenExpirationDate =
        expirationDate || new Date(TOKEN_EXPIRATION_PERIOD);
      setTokenExpDate(tokenExpirationDate);
      storeData('userData', {
        userId: id,
        token: tokenString,
        expiration: tokenExpirationDate.toISOString()
      });
      client.setLink(createAuthLink(tokenString));
      client.resetStore();
    },
    []
  );

  const automaticLogout: logoutFuncType = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpDate(null);
    client.clearStore();
  }, []);

  const logout: logoutFuncType = useCallback(() => {
    automaticLogout();
    localStorage.clear();
  }, [automaticLogout]);

  useEffect(() => {
    const storedData = getStoredData('userData');
    if (storedData && new Date(storedData.expiration) > new Date()) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login, token, userId]);

  useEffect(() => {
    if (token && tokenExpDate) {
      const remainingTime = tokenExpDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(automaticLogout, remainingTime);
    } else {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }
  }, [token, tokenExpDate, logout, automaticLogout]);

  return { userId, token, login, logout };
};
