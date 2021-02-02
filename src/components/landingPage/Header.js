import React from 'react';
import { Waypoint } from 'react-waypoint';
import { useAuth } from 'components/hooks/useAuth';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';

/* eslint-disable react/prop-types */

const Header = (props) => {
  const { logout, isLoggedIn } = useAuth();

  if (props.data) {
    var name = props.data.name;
    var occupation = props.data.occupation;
    var description = props.data.description;
    var city = props.data.address.city;
    var networks = props.data.social.map((network) => (
      <li key={network.name}>
        <a href={network.url}>
          <i className={network.className}></i>
        </a>
      </li>
    ));
  }

  return (
    <div className="header-wrapper">
      <div className="bg"></div>
      <header id="home" style={{ height: '100vh' }}>
        <nav
          id="nav-wrap"
          className={
            props.waypoint === 'home' || props.waypoint === 'about'
              ? ''
              : 'opaque'
          }
        >
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className={props.waypoint === 'home' ? 'current' : ''}>
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>
            <li className={props.waypoint === 'about' ? 'current' : ''}>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>
            <li className={props.waypoint === 'resume' ? 'current' : ''}>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>
            <li className={props.waypoint === 'portfolio' ? 'current' : ''}>
              <a className="smoothscroll" href="#portfolio">
                Works
              </a>
            </li>
            <li className={props.waypoint === 'testimonials' ? 'current' : ''}>
              <a className="smoothscroll" href="#testimonials">
                Testimonials
              </a>
            </li>
            <li className={props.waypoint === 'contact' ? 'current' : ''}>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to={ROUTES.SIGN_IN}>Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <span>Welcome home, Ondrej</span>
                </li>
                <li>
                  <span className="clickable" onClick={() => logout()}>
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Waypoint onEnter={() => props.setWaypoint()}>
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">I&apos;m {name}.</h1>
              <h3>
                I&apos;m a {city} based <span>{occupation}</span>. {description}
                .
              </h3>
              <hr />
              <ul className="social">{networks}</ul>
            </div>
          </div>
        </Waypoint>
        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="fa fa-chevron-circle-down"></i>
          </a>
        </p>
      </header>
    </div>
  );
};

export default Header;
