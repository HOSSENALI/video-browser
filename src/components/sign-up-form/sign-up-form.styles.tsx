import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  color: ${({ theme }) => theme.text};
  h2 {
    margin: 10px 0;
  }
`;
