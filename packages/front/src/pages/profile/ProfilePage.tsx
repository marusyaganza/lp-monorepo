import React, { useEffect } from 'react';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { UserQuery } from '../../generated/graphql';
import { useNotificationContext } from '../../app-context';
import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../../gql/queries';

export const ProfilePage = () => {
  const { error, loading, data } = useQuery<UserQuery>(USER_QUERY);
  const { setNotification } = useNotificationContext();

  useEffect(() => {
    if (error) {
      setNotification({
        variant: 'error',
        text: 'Error',
        subText: error?.message
      });
    }
  }, [error, setNotification]);
  return (
    <PageLayout isLoading={loading}>
      {data?.user && (
        <>
          <h1>{`Hello ${data.user.firstName} ${data.user.lastName}!`}</h1>
          <p>{`Your role is ${data.user.role}`}</p>
        </>
      )}
    </PageLayout>
  );
};

export default ProfilePage;
