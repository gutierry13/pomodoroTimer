import styled from 'styled-components'
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  nav {
    display: flex;
    gap: 0.5rem;
    a {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${(props) => props.theme['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']};
      }
      &.active {
        color: ${(props) => props.theme['green-500']};
      }
    }
  }
  @media (max-width: 800px) {
    margin-bottom: 2rem;
  }
  @media (max-width: 600px) {
    margin-bottom: 2rem;
  }
  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
  @media (max-width: 400px) {
    margin-bottom: 2rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
    nav {
      gap: 1.2rem;
      a {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`
