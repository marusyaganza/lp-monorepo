import React from 'react';
import { Link } from '@lp/ui';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import logo from '../../assets/img/404-page-logo.svg';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <PageLayout>
    <h1 className={styles.heading}>Page not found</h1>
    <div className={styles.content}>
      <img className={styles.image} src={logo} alt="" />
      <Link className={styles.button} variant="button" to="/">
        Go to Homepage
      </Link>
    </div>
  </PageLayout>
);

export default NotFoundPage;
