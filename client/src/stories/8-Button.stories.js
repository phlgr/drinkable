import React from 'react';
import Button from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

export const ButtonPrimary = () => (
  <Button background={'primary'}>Primary</Button>
);

export const ButtonSecondary = () => (
  <Button background={'secondary'}>Secondary</Button>
);

export const ButtonFull = () => (
  <Button background={'primary'} full>
    Full Button
  </Button>
);
