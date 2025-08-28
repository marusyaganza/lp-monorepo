import React, { useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext, useEnvironmentContext } from '../../app-context';
import { Notification } from '../Notification/Notification';

import './AuthPageLayout.css';
import { getStoredData } from '../../util/localStorageUtils';

export const AuthPageLayout = ({ children }: PropsWithChildren<unknown>) => {
  const navigate = useNavigate();
  const { userId } = useAuthContext();
  const { isDemo } = useEnvironmentContext();
  useEffect(() => {
    if (userId) {
      let previousLocation = '/';
      const storedLocation = getStoredData('previousLocation');
      if (!isDemo && storedLocation) {
        previousLocation = storedLocation;
        localStorage.removeItem('previousLocation');
      }
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
