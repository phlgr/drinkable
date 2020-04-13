import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import light from '../src/themes/light';
import GlobalStyles from '../src/themes/GlobalStyles';

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={light}>
    <GlobalStyles />
    {storyFn()}
  </ThemeProvider>
);

export default ThemeDecorator;
