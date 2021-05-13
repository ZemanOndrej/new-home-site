import { LANDING_WP } from 'components/routes/Landing';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Resume } from 'types/mainPage';

interface Props {
  data: Resume;
  setWaypoint: (wp: LANDING_WP) => void;
}

const resume = ({
  data: { education, skillmessage, work, skills },
  setWaypoint,
}: Props) => (
  <Waypoint onEnter={() => setWaypoint(LANDING_WP.ABOUT)}>
    <section id="resume">
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns education-item">
              {education.map((education) => {
                <div key={education.school}>
                  <h3>{education.school}</h3>
                  <p className="info">
                    {education.degree} <span>&bull;</span>
                    <em className="date">{education.graduated}</em>
                  </p>
                  <p>{education.description}</p>
                </div>;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          {work.map((work) => {
            <div key={work.company}>
              <h3>{work.company}</h3>
              <p className="info">
                {work.title}
                <span>&bull;</span> <em className="date">{work.years}</em>
              </p>
              <p>{work.description}</p>
            </div>;
          })}
        </div>
      </div>

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <p>{skillmessage}</p>

          <div className="bars">
            <ul className="skills">
              {skills.map((skills) => {
                const className = 'bar-expand ' + skills.name.toLowerCase();
                <li key={skills.name}>
                  <span
                    style={{ width: skills.level }}
                    className={className}
                  ></span>
                  <em>{skills.name}</em>
                </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Waypoint>
);

export default React.memo(resume);
