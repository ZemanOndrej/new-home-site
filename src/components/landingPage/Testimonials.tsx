import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Testimonials } from 'types/mainPage';
interface Props {
  data: Testimonials;
  setWaypoint: () => void;
}
const testimonials = ({ data: { testimonials }, setWaypoint }: Props) => (
  <Waypoint onEnter={() => setWaypoint()}>
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1>
              <span>Client Testimonials</span>
            </h1>
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
  </Waypoint>
);

export default testimonials;
