import React, {
  createContext,
  useContext,
  useMemo,
  PropsWithChildren
} from 'react';

interface EnvironmentContextType {
  isDevEnv: boolean;
  isDemo: boolean;
  isProduction: boolean;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined
);

export const EnvironmentProvider = ({
  children
}: PropsWithChildren<unknown>) => {
  const value: EnvironmentContextType = useMemo(
    () => ({
      isDevEnv: process?.env?.NODE_ENV !== 'production',
      isDemo: process?.env?.DEMO_VERSION === 'true',
      isProduction: process?.env?.NODE_ENV === 'production'
    }),
    []
  );

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironmentContext = (): EnvironmentContextType => {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error(
      'useEnvironmentContext must be used within an EnvironmentProvider'
    );
  }
  return context;
};
