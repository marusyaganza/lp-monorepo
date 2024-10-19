import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AppProvider } from './context/appContext';
import { router } from './routes';

import './App.css';
import { client } from './ApolloClient';

export const App = () => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </AppProvider>
  );
};
