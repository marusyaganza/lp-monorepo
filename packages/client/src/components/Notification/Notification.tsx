import React, { useContext, useCallback, useEffect } from 'react';
import { Notification as NotificationComponent } from '@lp/ui';
import { useLocation } from 'react-router-dom';

import { AppContext } from '../../context/appContext';

import './Notification.css';

export const Notification = () => {
  const { notification, setNotification } = useContext(AppContext);
  const location = useLocation();

  const closeHandler = useCallback(() => {
    setNotification();
  }, [setNotification]);

  useEffect(() => {
    const timeout = setTimeout(closeHandler, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [notification, closeHandler]);

  useEffect(() => {
    if (notification?.targetLocation !== location.pathname) {
      setNotification();
    }
  }, [location.pathname]);

  return (
    <>
      {notification && (
        <NotificationComponent
          data-cy={`notification-${notification?.variant}`}
          onClose={closeHandler}
          {...notification}
          className="notification"
        />
      )}
    </>
  );
};
