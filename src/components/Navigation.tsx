import React from 'react';
import * as ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useAuth } from 'components/hooks/useAuth';

export default function Navigation() {
  const { logout, isLoggedIn } = useAuth();
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>About</Link>
        </li>
        <li>
          <Link to={ROUTES.POSTS}>Posts</Link>
        </li>
        {!isLoggedIn && (
          <li>
            <Link to={ROUTES.SIGN_IN}>Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Typography variant="h6">Welcome home, Ondrej</Typography>
            </li>
            <li>
              <Button onClick={() => logout()}>Logout</Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
