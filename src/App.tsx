import React from 'react';
import 'App.css';
import Home from 'components/routes/Home';
import Navigation from 'components/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LANDING, HOME, SIGN_IN, ABOUT } from 'constants/routes';
import SignIn from './components/routes/SignIn';
import Landing from 'components/routes/Landing';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Navigation />
      <Route path={LANDING} component={Landing} exact />
      <Route path={HOME} component={Home} />
      <Route path={SIGN_IN} component={SignIn} />
      <Route path={ABOUT} />
    </Router>
  );
};

export default App;
