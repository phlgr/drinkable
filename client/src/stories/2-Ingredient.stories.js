import React from 'react';
import Ingredient from '../components/Ingredient';

export default {
  title: 'Ingredient Selector',
  component: Ingredient,
};

export const Unselected = () => <Ingredient>Cola</Ingredient>;
export const Selected = () => <Ingredient selected>Cola</Ingredient>;
