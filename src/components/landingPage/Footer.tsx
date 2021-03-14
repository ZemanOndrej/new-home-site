import React from 'react';
import { Main } from 'types/mainPage';

interface Props {
  data: Main;
}

const footer = ({ data: { social } }: Props) => (
  <footer>
    <div className="row">
      <div className="twelve columns">
        <ul className="social-links">
          {social.map((network) => {
            <li key={network.name}>
              <a href={network.url}>
                <i className={network.className}></i>
              </a>
            </li>;
          })}
        </ul>

        <ul className="copyright">
          <li>&copy; 2020</li>
          <li>
            Design by{' '}
            <a title="Styleshout" href="http://www.styleshout.com/">
              Styleshout
            </a>
          </li>
        </ul>
      </div>
      <div id="go-top">
        <a className="smoothscroll" title="Back to Top" href="#home">
          <i className="fa fa-chevron-up"></i>
        </a>
      </div>
    </div>
  </footer>
);

export default footer;
