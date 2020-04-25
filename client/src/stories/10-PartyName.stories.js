import React from 'react';
import PartyName from '../components/PartyName';

export default {
  title: 'Party Name',
  component: PartyName,
};

export const Name = () => <PartyName partyName={'Your Party'} />;
