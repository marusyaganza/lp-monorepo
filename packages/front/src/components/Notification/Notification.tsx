import React, { useContext, useCallback } from 'react';
import { Notification as NotificationComponent } from '@lp/ui';

import { AppContext } from '../../app-context/appContext';

import './Notification.css';

export const Notification = () => {
  const { notification, setNotification } = useContext(AppContext);
  const closeHandler = useCallback(() => {
    setNotification();
  }, [setNotification]);
  return (
    <>
      {notification && (
        <NotificationComponent
          onClose={closeHandler}
          {...notification}
          className="notification"
        />
      )}
    </>
  );
};
