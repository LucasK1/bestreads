import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'store/actions';

import NavItem from './NavItem/NavItem';
// import { ReactComponent as CaretIcon } from '../../../assets/caret.svg';
// import DropdownMenu from '../../DropdownMenu/DropdownMenu';

import classes from './NavBar.module.scss';

const NavBar = ({ idToken, logout }) => {
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

const mapStateToProps = (state) => ({
  idToken: state.auth.idToken,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
