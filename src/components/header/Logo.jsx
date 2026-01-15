import React from 'react';
import msIcon from '../../assets/img/minseokIcon.png';
import { Link } from 'react-router-dom';
const Logo = ({ toggleMenu }) => {
  return (
    <h1 className="header__logo">
      <Link href="/">
        <img src={msIcon} aria-hidden="true" onClick={toggleMenu}></img>
        <span>
          Minseok
          <br />
          youtube
        </span>
      </Link>
    </h1>
  );
};

export default Logo;
