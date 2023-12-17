import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import window from '../../assets/img/window.svg';
import world from '../../assets/img/world.svg';
import books from '../../assets/img/books.svg';
import training from '../../assets/img/training.svg';
import aircraft from '../../assets/img/aircraft.svg';
import { routes } from '../../constants/routes';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <PageLayout>
      <section className={styles.banner}>
        <div className={styles.topContainer}>
          <h1 className={styles.mainHeading}>
            The Power of Learning Languages
          </h1>
          <p className={styles.bannerText}>
            Embark on the captivating adventure of learning languages today.
            Unlock the world, broaden your horizons, and experience the
            countless benefits that language learning brings.
          </p>
          <Button
            onClick={() => {
              navigate(routes.search);
            }}
          >
            Get started
          </Button>
        </div>
        <img className={styles.mainPict} src={window} alt="" />
      </section>
      <div className={styles.mainContent}>
        <h2 className={styles.subheading}>
          Curate a collection of words that resonate with you
        </h2>
        <p className={styles.mainText}>
          Building a robust vocabulary is the cornerstone of language mastery.
          With our user-friendly interface, you can effortlessly look up words
          and seamlessly add them to your personal vocabulary bank.{' '}
        </p>
        <section className={styles.catalog}>
          <div>
            <img className={styles.pict} src={world} alt="" />
            <p>Unlock the World Through Words!</p>
          </div>
          <div>
            <img className={styles.pict} src={books} alt="" />
            <p>Add Words to Your Vocabulary</p>
          </div>
          <div>
            <img className={styles.pict} src={training} alt="" />
            <p>Practice with Purpose</p>
          </div>
        </section>
      </div>
      <div className={styles.bottomContainer}>
        <section className={styles.bottomContent}>
          <p className={styles.mainText}>
            Ready to take the leap? Start your language-learning journey today
            with our interactive word games. Whether you&lsquo;re brushing up on
            your English proficiency or exploring the nuances of Spanish,
            we&lsquo;re here to empower you every step of the way. Join our
            community of enthusiastic learners and let&lsquo;s embark on this
            exciting voyage together!
          </p>
          <Button
            onClick={() => {
              navigate(routes.games);
            }}
            className={styles.secondaryButton}
            variant="secondary"
          >
            Practice words
          </Button>
        </section>
        <img className={styles.planePic} src={aircraft} alt="" />
      </div>
    </PageLayout>
  );
};

export default HomePage;
