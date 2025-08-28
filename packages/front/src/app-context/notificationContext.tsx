import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren
} from 'react';
import { NotificationProps as CoreNotificationProps } from '@lp/ui';

interface NotificationProps extends CoreNotificationProps {
  targetLocation?: string;
}

export interface NotificationContextType {
  notification?: NotificationProps;
  setNotification: (notification?: NotificationProps) => void;
  clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children
}: PropsWithChildren<unknown>) => {
  const [notification, setNotification] = useState<
    NotificationProps | undefined
  >();

  const clearNotification = () => {
    setNotification(undefined);
  };

  const value: NotificationContextType = {
    notification,
    setNotification,
    clearNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider'
    );
  }
  return context;
};
