import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@lp/ui';

import { PageLayout } from '../../components/PageLayout/PageLayout';
import { AppContext } from '../../app-context/appContext';

import './HomePage.css';

const HomePage = () => {
  const { setNotification } = useContext(AppContext);
  return (
    <PageLayout>
      <h1>Home page</h1>
      <Link to="/games">Go to games</Link>
      <Outlet />
      {/* Temporary content */}
      <div className="homePageButtons">
        <Button
          onClick={() => {
            setNotification({
              variant: 'success',
              text: 'Success',
              subText: 'Everithing is just fine!'
            });
          }}
          variant="success"
        >
          Show Success Notification
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            setNotification({
              variant: 'error',
              text: 'Error',
              subText: 'Something went wrong'
            });
          }}
        >
          Show Error Notification
        </Button>
      </div>
    </PageLayout>
  );
};

export default HomePage;
