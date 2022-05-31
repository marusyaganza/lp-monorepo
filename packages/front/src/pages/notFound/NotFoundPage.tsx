import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components/PageLayout/PageLayout';

const NotFoundPage = () => (
  <PageLayout>
    <h1>404 page page</h1>
    <Link to="/">Go to Homepage</Link>
  </PageLayout>
);

export default NotFoundPage;
