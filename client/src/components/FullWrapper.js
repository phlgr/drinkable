import styled from '@emotion/styled';

const FullWrapper = styled.div`
  position: fixed;
  padding: 20px;
  height: 100%;
  width: 100vw;
  color: ${(props) => props.theme.secondaryActive};
`;

export default FullWrapper;
