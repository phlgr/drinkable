import styled from '@emotion/styled';

const Button = styled.button`
  font-family: Comfortaa;
  font-weight: 500;
  background: ${(props) => props.theme[props.background]};
  color: #fff;
  font-size: 1.7rem;
  border: none;
  border-radius: 10px;
  padding: 20px 15px;
  width: ${(props) => (props.full ? '100%' : 'auto')};
  line-height: 20px;
  outline: 0;
  box-shadow: 0 3px 6px black;
`;

export default Button;
