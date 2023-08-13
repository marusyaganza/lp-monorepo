import { useState, useCallback, useEffect } from 'react';
import { getStoredData, storeData } from '../util/localStorageUtils';
import { createAuthLink } from '../app';
import { client } from '../app';
export type loginFuncType = (
  id: string,
  tokenString: string,
  expirationDate?: Date
) => void;

export type logoutFuncType = () => void;

let logoutTimer: NodeJS.Timeout | undefined;

// token expires in 2 days
const TOKEN_EXPIRATION_PERIOD = new Date().getTime() + 1000 * 60 * 60 * 2;

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

  const logout: logoutFuncType = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpDate(null);
    localStorage.clear();
    client.clearStore();
  }, []);

  useEffect(() => {
    const storedData = getStoredData<'userData'>('userData');
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
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }
  }, [token, tokenExpDate, logout]);

  return { userId, token, login, logout };
};
