import { addDecorator } from '@storybook/react';
import themeDecorator from './themeDecorator';
import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addDecorator(themeDecorator);

addParameters({
  viewport: { viewports: INITIAL_VIEWPORTS, defaultViewport: 'iphone6' },
});
