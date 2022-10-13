import styled from 'styled-components'

export const StyledHeader = styled.header`
  background-color: var(--yellowish);
  width: 100%;
`

export const Container = styled.section`
  padding: 10px 20px;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`

export const LogoWrapper = styled.div`
  max-width: 100px;
  height: 45px;

  img {
    width: 100%;
    height: 100%;
  }
`

export const NavWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const SettingsWrapper = styled.section`
  width: 150px;
  text-align: right;
`

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row-reverse;
`
