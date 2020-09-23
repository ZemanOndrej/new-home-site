/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Waypoint } from 'react-waypoint';

const About = (props: {
  data: {
    name: any;
    image: any;
    bio: any;
    address: { street: any; city: any; state: any; zip: any };
    phone: any;
    email: any;
    resumedownload: any;
  };
  setWaypoint: () => void;
}) => {
  if (props.data) {
    const name = props.data.name;
    const profilepic = props.data.image;
    const bio = props.data.bio;
    const street = props.data.address.street;
    const city = props.data.address.city;
    const state = props.data.address.state;
    const zip = props.data.address.zip;
    const phone = props.data.phone;
    const email = props.data.email;
    const resumeDownload = props.data.resumedownload;
    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img
              className="profile-pic"
              src={profilepic}
              alt="Ondrej Zeman Profile Pic"
            />
          </div>
          <div className="nine columns main-col">
            <Waypoint onEnter={() => props.setWaypoint()}>
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
  }
  return null;
};

export default About;
