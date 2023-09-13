import React, { useContext, useEffect } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { useUserQuery } from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';

export const ProfilePage = () => {
  const { error, loading, data } = useUserQuery();
  const { setNotification } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message,
        sameLocation: true
      });
    }
  }, [error, setNotification]);
  const date = new Date(Number.parseInt(data?.user?.createdAt || ''));
  return (
    <PageLayout isLoading={loading}>
      {data?.user && (
        <>
          <h1>{`Hello ${data.user.firstName} ${data.user.lastName}!`}</h1>
          <p>{`Your role is ${data.user.role} sinse ${date}`}</p>
        </>
      )}
    </PageLayout>
  );
};

export default ProfilePage;
