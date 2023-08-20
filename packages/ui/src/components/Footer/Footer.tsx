import React from 'react';
import { IconIdType } from '../Icon/icon';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/icon';
import styles from './Footer.module.css';
import logo from '../../assets/img/LogoV2.svg';
import { cn } from '../../utils/classnames';

export type LinkType = {
  url: string;
  text: string;
  icon?: IconIdType;
};

export interface FooterProps {
  links?: LinkType[];
}

export const Footer = ({ links }: FooterProps) => {
  const renderLinks = () => {
    if (!links) {
      return;
    }
    return (
      <ul className={styles.links}>
        {links.map(link => (
          <li key={link.text}>
            <Link className={styles.link} to={link.url}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logo} alt="logo" />
        <span className={styles.logoText}>Language Power</span>
      </div>
      {renderLinks()}
      <div className={styles.logo}>
        <Icon id="git" width={18} height={20} />
        <a
          className={cn(styles.gitLink, styles.link)}
          href="https://github.com/marusyaganza"
          rel="noreferrer"
          target="_blank"
        >
          marusyaganza
        </a>
      </div>
    </footer>
  );
};
