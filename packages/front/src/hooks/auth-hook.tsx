import { useState, useCallback, useEffect, useRef } from 'react';
import { getStoredData, storeData } from '../util/localStorageUtils';
import { client, createAuthLink } from '../app';
export type loginFuncType = (
  id: string,
  tokenString: string,
  expirationDate?: Date
) => void;

export type logoutFuncType = () => void;

const tokenTTL = Number.parseInt(process.env.TOKEN_TTL || '7');

const isDemo = process.env.DEMO_VERSION === 'true';

const TOKEN_EXPIRATION_PERIOD = isDemo
  ? 3600 * 1000
  : 1000 * 60 * 60 * 24 * tokenTTL;

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>();
  const [token, setToken] = useState<string | null>();
  const [tokenExpDate, setTokenExpDate] = useState<Date | null>();
  const logoutTimerRef = useRef<NodeJS.Timeout | undefined>();

  const login: loginFuncType = useCallback(
    (id, tokenString, expirationDate) => {
      setUserId(id);
      setToken(tokenString);
      const tokenExpirationDate =
        expirationDate ||
        new Date(TOKEN_EXPIRATION_PERIOD + new Date().getTime());
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
      logoutTimerRef.current = setTimeout(
        isDemo ? logout : automaticLogout,
        remainingTime
      );
    }
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = undefined;
      }
    };
  }, [token, tokenExpDate, logout, automaticLogout]);

  return { userId, token, login, logout };
};
