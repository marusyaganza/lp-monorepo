import { useState, useCallback, useEffect } from 'react';
import { getUserData } from '../util/getUserData';
import { client } from '../app';
export type loginFuncType = (
  id: string,
  tokenString: string,
  expirationDate?: Date
) => void;

export type logoutFuncType = () => void;

let logoutTimer: NodeJS.Timeout | undefined;

const TOKEN_EXPIRATION_PERIOD =
  new Date().getTime() + 1000 * 60 * 60 * 24 * 365;

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
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: id,
          token: tokenString,
          expiration: tokenExpirationDate.toISOString()
        })
      );
    },
    []
  );

  const logout: logoutFuncType = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpDate(null);
    localStorage.removeItem('userData');
    client.clearStore();
  }, []);

  useEffect(() => {
    const storedData = getUserData();
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
