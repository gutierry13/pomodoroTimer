import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'
import { Timer, Scroll, HourglassMedium } from 'phosphor-react'
export function Header() {
  return (
    <HeaderContainer>
      <span>
        <HourglassMedium size={32} color="#00875f" />
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
