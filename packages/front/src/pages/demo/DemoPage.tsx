import React, { useEffect, useContext } from 'react';

import { Button } from '@lp/ui';
import { AuthPageLayout } from '../../components/AuthPageLayout/AuthPageLayout';
import { CreateDemoUserMutation } from '../../generated/graphql';
import { AppContext } from '../../app-context/appContext';

import { useMutation } from '@apollo/client';
import { CREATE_DEMO_USER_MUTATION } from '../../gql/mutations';
import pageHero from '../../assets/img/demo-img.svg';
import styles from './DemoPage.module.css';

const DemoPage = () => {
  const [createDemoUserFunc, { data, loading, error }] =
    useMutation<CreateDemoUserMutation>(CREATE_DEMO_USER_MUTATION);
  const { login, setNotification } = useContext(AppContext);

  const submitHandler = () => {
    createDemoUserFunc();
  };

  useEffect(() => {
    if (data) {
      const fetchedData = data.createDemoUser;
      login(fetchedData.id, fetchedData.token);
    }
  }, [data, login]);

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
    <AuthPageLayout>
      <h1 data-cy="sign-up-heading" className={styles.heading}>
        Welcome to Language Power
      </h1>
      <section className={styles.hero}>
        <div className={styles.mainContent}>
          <p>
            Language Power is a personal hobby project designed for
            self-education and self-discovery. Here, you can look up words, save
            and edit them at your own pace.
          </p>
          <p>
            Practice makes perfect—engage with over five interactive games to
            reinforce your vocabulary. The app integrates with the
            Merriam-Webster dictionary and uses a simplified spaced repetition
            algorithm to optimize your learning. Currently, you can explore
            words in English and Spanish.
          </p>
          <p>
            Enjoy full access to the demo mode for one hour. After that, all
            your data will be automatically deleted to keep your experience
            fresh and secure.
          </p>
        </div>

        <img className={styles.picture} src={pageHero} alt="" />
      </section>
      <section className={styles.cta}>
        <p>
          Ready to explore? Click &quot;Start Demo&quot; to begin your language
          journey!
        </p>
        <Button variant="secondary" isLoading={loading} onClick={submitHandler}>
          Start demo
        </Button>
      </section>
    </AuthPageLayout>
  );
};

export default DemoPage;
