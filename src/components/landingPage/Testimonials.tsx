import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Testimonials } from 'types/mainPage';
import { LANDING_WP } from 'components/routes/Landing';
interface Props {
  data: Testimonials;
  setWaypoint: (wp: LANDING_WP) => void;
}
const testimonials = ({ data: { testimonials }, setWaypoint }: Props) => (
  <section id="testimonials">
    <div className="text-container">
      <div className="row">
        <div className="two columns header-col">
          <Waypoint onEnter={() => setWaypoint(LANDING_WP.TESTIMONIALS)}>
            <h1>
              <span>Client Testimonials</span>
            </h1>
          </Waypoint>
        </div>

        <div className="ten columns flex-container">
          <ul className="slides">
            {testimonials.map(({ user, text }) => {
              <li key={user}>
                <blockquote>
                  <p>{text}</p>
                  <cite>{user}</cite>
                </blockquote>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default React.memo(testimonials);
