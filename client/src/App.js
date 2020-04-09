import React from 'react';
import GlobalStyles from './themes/GlobalStyles';
import { ThemeProvider } from 'emotion-theming';
import { light } from './themes/light.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

function App() {
  const [theme] = React.useState(light);
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
