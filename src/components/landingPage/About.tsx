import { LANDING_WP } from 'components/routes/Landing';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Main } from 'types/mainPage';

interface Props {
  data: Main;
  setWaypoint: (wp: LANDING_WP) => void;
}

const about = ({
  data: {
    name,
    image,
    bio,
    email,
    phone,
    resumedownload: resumeDownload,
    address: { city, street, state, zip },
  },
  setWaypoint,
}: Props) => (
  <section id="about">
    <div className="row">
      <div className="three columns">
        <img
          className="profile-pic"
          src={image}
          alt="Ondrej Zeman Profile Pic"
        />
      </div>
      <div className="nine columns main-col">
        <Waypoint onEnter={() => setWaypoint(LANDING_WP.ABOUT)}>
          <h2>About Me</h2>
        </Waypoint>

        <p>{bio}</p>
        <div className="row">
          <div className="columns contact-details">
            <h2>Contact Details</h2>
            <p className="address">
              <span>{name}</span>
              <br />
              <span>
                {street}
                <br />
                {city} {state}, {zip}
              </span>
              <br />
              <span>{phone}</span>
              <br />
              <span>{email}</span>
            </p>
          </div>
          <div className="columns download">
            <p>
              <a href={resumeDownload} className="button">
                <i className="fa fa-download"></i>Download Resume
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default React.memo(about);
