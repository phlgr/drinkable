import React from 'react';
import ListItem from '../components/ListItem';

export default {
  title: 'List Item',
  component: ListItem,
};

export const Item = () => <ListItem ingredient={'Coca-Cola'} amount={4} />;
