import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import NavItem from './NavItem/NavItem';
import { RootState } from 'types/StateTypes';
// import { ReactComponent as CaretIcon } from '../../../assets/caret.svg';
// import DropdownMenu from '../../DropdownMenu/DropdownMenu';

import classes from './NavBar.module.scss';

const NavBar: FC = () => {
  const { idToken } = useSelector((state: RootState) => state.auth);

  return (
    <nav className={classes.NavBar}>
      <div className={classes.Container}>
        <NavItem path="/" title="Bestreads" />
        <ul className={classes.NavItems}>
          {idToken ? (
            <>
              <NavItem path="/shelf" title="Shelf" />
              <NavItem path="/logout" title="logout" />
            </>
          ) : (
            <NavItem path="/signup" title="Sign Up" />
          )}
          {/* <NavItem
            dropdown
            title={
              <CaretIcon
                style={{ fill: '#544', width: '20px', height: '20px' }}
              />
            }>
            <DropdownMenu />
          </NavItem> */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
