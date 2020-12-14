import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import DropdownItem from './DropdownItem/DropdownItem';

import classes from './DropdownMenu.module.scss';

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  return (
    <div className={classes.dropdownMenu} style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === 'main'}
        onEnter={calcHeight}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: classes['menu-primary-enter'],
          enterActive: classes['menu-primary-enter-active'],
          exit: classes['menu-primary-exit'],
          exitActive: classes['menu-primary-exit-active'],
        }}>
        <div className={classes.menu}>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem clicked={() => setActiveMenu('settings')}>
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'settings'}
        onEnter={calcHeight}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: classes['menu-secondary-enter'],
          enterActive: classes['menu-secondary-enter-active'],
          exit: classes['menu-secondary-exit'],
          exitActive: classes['menu-secondary-exit-active'],
        }}>
        <div className={classes.menu}>
          <DropdownItem clicked={() => setActiveMenu('main')}>
            Go back
          </DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
