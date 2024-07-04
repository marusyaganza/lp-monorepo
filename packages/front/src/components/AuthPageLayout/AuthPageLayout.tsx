import React, { useContext, useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../app-context/appContext';
import { Notification } from '../Notification/Notification';

import './AuthPageLayout.css';
import { getStoredData } from '../../util/localStorageUtils';

export const AuthPageLayout = ({ children }: PropsWithChildren<unknown>) => {
  const navigate = useNavigate();
  const { userId } = useContext(AppContext);

  useEffect(() => {
    if (userId) {
      const previousLocation = getStoredData('previousLocation') || '/';
      localStorage.removeItem('previousLocation');
      navigate(previousLocation);
    }
  }, [userId, navigate]);

  return (
    <div className="authPageContent">
      <Notification />
      <main className="authFormContainer">{children}</main>
    </div>
  );
};
