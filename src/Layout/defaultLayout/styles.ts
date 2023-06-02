import styled from 'styled-components'
export const LayoutContainer = styled.div`
  max-width: 74rem;
  margin: 5rem auto;
  padding: 2.5rem;
  background-color: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    margin: 5rem auto;
  }
  @media (max-width: 600px) {
    margin: 8rem auto;
  }
  @media (max-width: 400) {
    button {
      width: 100%;
      margin-top: 1rem;
      padding: 0.75rem;
    }
  }
`
