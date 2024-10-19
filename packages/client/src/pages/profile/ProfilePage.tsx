import React, { useContext, useEffect } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { UserQuery } from '../../generated/graphql';
import { AppContext } from '../../context/appContext';
import { useQuery } from '@apollo/client';
import { USER } from '../../gql/queries';

export const ProfilePage = () => {
  const { error, loading, data } = useQuery<UserQuery>(USER);
  const { setNotification } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message
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
