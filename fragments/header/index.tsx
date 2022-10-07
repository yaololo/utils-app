import React from 'react'
import Link from 'next/link'

import {
  Container,
  LogoWrapper,
  NavWrapper,
  StyledHeader,
  SettingsWrapper,
  NavBar
} from './styles'
import { navItems } from './nav-items'

const Header = () => {
  return (
    <StyledHeader>
      <Container className="flex justify-space-between align-center">
        <LogoWrapper>
          <Link href="/">
            <a>
              <img src="/logo/svg/logo.svg" alt="company logo" />
            </a>
          </Link>
        </LogoWrapper>
        <NavBar>
          <SettingsWrapper>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </SettingsWrapper>
          <NavWrapper className="flex justify-space-between">
            {navItems.map((item) => (
              <React.Fragment key={item.value}>
                <li>
                  <Link href={item.link}>
                    <a>{item.text}</a>
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </NavWrapper>
        </NavBar>
      </Container>
    </StyledHeader>
  )
}

export default Header
