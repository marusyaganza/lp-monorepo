import React from 'react';
import { IconIdType } from '../Icon/icon';
import { Link, NavLink } from 'react-router-dom';
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
  mobileLinks?: LinkType[];
}

export const Footer = ({ links, mobileLinks }: FooterProps) => {
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

  const renderMobileNav = () => {
    if (!mobileLinks) {
      return;
    }
    return (
      <ul className={styles.mobileNav}>
        {mobileLinks.map(link => (
          <li key={link.text}>
            <NavLink
              className={({ isActive }) =>
                isActive ? cn(styles.activeLink, styles.link) : styles.link
              }
              to={link.url}
            >
              {link.icon && <Icon id={link.icon} height={24} width={30} />}
              <span className={styles.hidden}>{link.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <footer className={styles.footer}>
      {renderMobileNav()}
      <div className={styles.footerDesktop}>
        <div className={styles.footerContent}>
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
        </div>
      </div>
    </footer>
  );
};
