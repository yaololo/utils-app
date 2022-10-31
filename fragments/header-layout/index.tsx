import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'

import {
  Container,
  LogoWrapper,
  NavWrapper,
  StyledHeader,
  SettingsWrapper,
  NavBar,
} from './styles'
import { navItems } from './nav-items'
import { ReactWithChildRen } from '@/interfaces/utils'
import UserProfile from './user-profile'

const HeaderLayout: React.FC<ReactWithChildRen> = ({ children }) => {
  return (
    <>
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
            <UserProfile />
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
      {children}
    </>
  )
}

export default HeaderLayout
