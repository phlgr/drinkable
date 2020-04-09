import styled from '@emotion/styled';

const Button = styled.button`
  font-family: Comfortaa;
  font-weight: 500;
  background: ${(props) => props.theme[props.background]};
  color: #fff;
  font-size: 1.7rem;
  border: none;
  border-radius: 10px;
  padding: 0px 20px;
  margin: 20px 0;
`;

export default Button;
