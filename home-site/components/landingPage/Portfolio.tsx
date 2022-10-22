import { LANDING_WP } from 'consts';
import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Portfolio } from 'types/mainPage';

interface Props {
  data: Portfolio;
  setWaypoint: (wp: LANDING_WP) => void;
}
const portfolio = ({ data: { projects }, setWaypoint }: Props) => (
  <Waypoint onEnter={() => setWaypoint(LANDING_WP.PORTFOLIO)}>
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Check Out Some of My Works.</h1>

          <div
            id="portfolio-wrapper"
            className="bgrid-quarters s-bgrid-thirds cf"
          >
            {projects.map(({ title, url, image, category }) => (
              <div key={title} className="columns portfolio-item">
                <div className="item-wrap">
                  <a href={url} title={title}>
                    <img alt={title} src={image} loading="lazy" />
                    <div className="overlay">
                      <div className="portfolio-item-meta">
                        <h5>{title}</h5>
                        <p>{category}</p>
                      </div>
                    </div>
                    <div className="link-icon">
                      <i className="fa fa-link"></i>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </Waypoint>
);

export default React.memo(portfolio);
