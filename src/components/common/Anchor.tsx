import { LANDING_WP } from 'components/routes/Landing';
import React, { useCallback, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  title?: string;
  href: string;
  wp?: LANDING_WP;
  setWaypoint?: (wp: LANDING_WP) => void;
}
const defaultScollOptions = { behavior: 'smooth' } as ScrollIntoViewOptions;
const anchor = ({ children, href, wp, setWaypoint, title }: Props) => {
  const anchor = useRef<HTMLAnchorElement>(null);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView(defaultScollOptions);
      setTimeout(() => {
        if (wp && setWaypoint) setWaypoint(wp);
        history.pushState({}, '', href);
      }, 200);
    },
    [wp, href, setWaypoint],
  );

  return (
    <a ref={anchor} href={href} onClick={handleClick} title={title}>
      {children}
    </a>
  );
};
export default anchor;
