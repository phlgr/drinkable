import React from 'react';
import Loading from '../components/Loading';

export default {
  title: 'Loading',
  component: Loading,
};

export const Standard = () => <Loading />;
export const White = () => <Loading white />;
export const Fullscreen = () => <Loading fullscreen />;
