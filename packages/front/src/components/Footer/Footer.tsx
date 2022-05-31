import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <address className="contactInfo">
        <span>
          created by{' '}
          <a href="mailto:marusyaganza@yandex.ru" className="contactLink">
            marusyaganza
          </a>
        </span>
      </address>
    </footer>
  );
};
