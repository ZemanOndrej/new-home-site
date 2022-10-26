import { LANDING_WP } from 'consts';
import Image from 'next/future/image';
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

          <div className="portfolio-grid">
            {projects.map(({ title, url, image, category }) => (
              <div key={title} className="portfolio-item">
                <div className="item-wrap" style={{ height: 200 }}>
                  <a href={url} title={title}>
                    <Image
                      alt={title}
                      src={image}
                      loading="lazy"
                      width={'200'}
                      height={0}
                      style={{ width: '100%', height: '100%', minHeight: 200 }}
                    />
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
