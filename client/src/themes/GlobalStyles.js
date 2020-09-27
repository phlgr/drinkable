import React from 'react';
import { Global, css } from '@emotion/core';

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => css`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }

        body {
          font-family: 'Comfortaa';
          font-size: 16px;
          margin: 0px;
          background: ${theme.background};
          height: 100%;
          width: 100vw;
        }
      `}
    />
  );
}

const bp = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const mq = (n) => {
  const bpArray = Object.keys(bp).map((key) => [key, bp[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};
