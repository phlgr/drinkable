import { addDecorator } from '@storybook/react';
import ThemeDecorator from './ThemeDecorator';
import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  viewport: { viewports: INITIAL_VIEWPORTS, defaultViewport: 'iphone6' },
});

addDecorator(ThemeDecorator);
