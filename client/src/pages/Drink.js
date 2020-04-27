import React from 'react';
import styled from '@emotion/styled';

import Header from '../components/Header';

const FullWrapper = styled.div`
  padding: 20px;
`;

export default function Drink() {
  return (
    <FullWrapper>
      <Header />
    </FullWrapper>
  );
}
