import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/classnames';

import styles from './UserMenu.module.css';
import avatar from '../../assets/img/avatar.svg';
import { IconIdType, Icon } from '../Icon/icon';

export type UserMenuItemType = {
  //TODO consider adding additional param 'type' or 'as' to decide wheather the menu item should be a link or a button
  /** if url prop is provided, menu item is rendered using react router 6 Link component
   * it is not recommended set url and onClick props simultaneously
   */
  url?: string;
  /** if onClick prop is provided, menu item is rendered as button component */
  onClick?: () => void;
  /**User menu item text */
  text: string;
  /**id param of the Icon component */
  icon?: IconIdType;
};

// TODO add a prop to display a user avatar
export interface UserMenuProps {
  /**config with links or buttons to display in the User menu */
  menuItems: UserMenuItemType[];
  /**additional styling */
  className?: string;
}

/**UserMenu is a dropdown with links or buttons that displays user avatar*/
export const UserMenu = ({ className, menuItems }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (!elementRef?.current?.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', clickOutsideHandler);
    } else {
      document.removeEventListener('click', clickOutsideHandler);
    }

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [isOpen]);

  return (
    <div ref={elementRef} className={cn(className, styles.container)}>
      <button
        data-cy="user-menu"
        className={styles.avatar}
        onClick={() => {
          setIsOpen(curr => !curr);
        }}
      >
        <span className={styles.hidden}>user menu</span>
        <img className={styles.avatarImage} src={avatar} alt="user avatar" />
      </button>
      {isOpen && (
        <ul data-cy="user-menu-items" className={cn(styles.content)}>
          {menuItems.map(item => {
            const { url, text, icon, onClick } = item;
            return (
              <li className={styles.listItem} key={text}>
                {url && (
                  <Link className={styles.menuLink} to={url}>
                    {icon && <Icon height={17} width={17} id={icon} />}
                    {text}
                  </Link>
                )}
                {onClick && (
                  <button className={styles.munuButton} onClick={onClick}>
                    {icon && <Icon height={17} width={17} id={icon} />}
                    {text}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
