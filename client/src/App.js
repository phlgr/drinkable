import React from 'react';
import GlobalStyles from './themes/GlobalStyles';
import { ThemeProvider } from 'emotion-theming';
import light from './themes/light.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import Party from './pages/Party';

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
          <Route exact path="/party/:id/ingredients">
            <Ingredients />
          </Route>
          <Route exact path="/party/:id/">
            <Party />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
