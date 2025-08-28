import React, { PropsWithChildren } from 'react';
import { AuthProvider } from './authContext';
import { LanguageProvider } from './languageContext';
import { NotificationProvider } from './notificationContext';
import { EnvironmentProvider } from './environmentContext';

/**
 * Composite provider that combines all application contexts
 * Order matters: Environment -> Auth -> Language -> Notification
 */
export const AppProviders = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <EnvironmentProvider>
      <AuthProvider>
        <LanguageProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </LanguageProvider>
      </AuthProvider>
    </EnvironmentProvider>
  );
};
