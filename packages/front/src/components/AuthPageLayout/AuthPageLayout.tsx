import React, { useContext, useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../app-context/appContext';
import { Notification } from '../Notification/Notification';

import './AuthPageLayout.css';

export const AuthPageLayout = ({ children }: PropsWithChildren<unknown>) => {
  const navigate = useNavigate();
  const { userId } = useContext(AppContext);

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  return (
    <div className="authPageContent">
      <Notification />
      <main className="authFormContainer">{children}</main>
    </div>
  );
};
