import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { useAuth } from 'components/hooks/useAuth';
import { Link } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import { Main } from 'types/mainPage';
import useSettings from '../hooks/useSettings';
import { LANDING_WP } from 'components/routes/Landing';
import Anchor from 'components/common/Anchor';

interface Props {
  data: Main;
  setWaypoint: (wp: LANDING_WP) => void;
  waypoint: string;
}

const Header = ({
  data: {
    name,
    occupation,
    description,
    social,
    address: { city },
  },
  setWaypoint,
  waypoint,
}: Props) => {
  const { logout, isLoggedIn } = useAuth();
  const { changeIsEditing, isEditing } = useSettings();
  const [navClassName, setNavClassName] = useState('');

  return (
    <div className="header-wrapper">
      <div className="bg"></div>
      <header id="home" style={{ height: '100vh' }}>
        <nav id="nav-wrap" className={navClassName}>
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className={waypoint === LANDING_WP.HOME ? 'current' : ''}>
              <Anchor
                href="#home"
                wp={LANDING_WP.HOME}
                setWaypoint={setWaypoint}
              >
                Home
              </Anchor>
            </li>
            <li className={waypoint === LANDING_WP.ABOUT ? 'current' : ''}>
              <Anchor
                href="#about"
                wp={LANDING_WP.ABOUT}
                setWaypoint={setWaypoint}
              >
                About
              </Anchor>
            </li>
            <li className={waypoint === LANDING_WP.RESUME ? 'current' : ''}>
              <Anchor
                href="#resume"
                wp={LANDING_WP.RESUME}
                setWaypoint={setWaypoint}
              >
                Resume
              </Anchor>
            </li>
            <li className={waypoint === LANDING_WP.PORTFOLIO ? 'current' : ''}>
              <Anchor
                href="#portfolio"
                wp={LANDING_WP.PORTFOLIO}
                setWaypoint={setWaypoint}
              >
                Works
              </Anchor>
            </li>
            <li className={waypoint === LANDING_WP.CONTACT ? 'current' : ''}>
              <Anchor
                href="#contact"
                wp={LANDING_WP.CONTACT}
                setWaypoint={setWaypoint}
              >
                Contact
              </Anchor>
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
                <li>
                  <span className="clickable" onClick={() => changeIsEditing()}>
                    <i
                      style={{ fontSize: 18 }}
                      className={`fa ${isEditing ? 'fa-save' : 'fa-edit'}`}
                    ></i>
                    {!isEditing ? 'Edit' : 'Save'}
                  </span>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Waypoint
          onEnter={() => {
            setWaypoint(LANDING_WP.HOME);
            setNavClassName('');
          }}
          onLeave={() => setNavClassName('opaque')}
        >
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">I&apos;m {name}.</h1>
              <h3>
                I&apos;m a {city} based <span>{occupation}</span>. {description}
                .
              </h3>
              <hr />
              <ul className="social">
                {social.map((network) => (
                  <li key={network.name}>
                    <a href={network.url}>
                      <i className={network.className}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Waypoint>
        <p className="scrolldown">
          <Anchor href="#about" wp={LANDING_WP.ABOUT} setWaypoint={setWaypoint}>
            <i className="fa fa-chevron-circle-down"></i>
          </Anchor>
        </p>
      </header>
    </div>
  );
};

export default React.memo(Header);
