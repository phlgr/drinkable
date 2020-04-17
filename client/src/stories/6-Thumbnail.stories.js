import React from 'react';
import Thumbnail from '../components/Thumbnail';
import link from '../assets/mojito.jpg';

export default {
  title: 'Thumbnail',
  component: Thumbnail,
};

export const ThumbnailItem = () => <Thumbnail src={link} name={'Mojito'} />;
