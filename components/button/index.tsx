import React from 'react'
import styled from 'styled-components'

import { ReactWithChildRen } from '@/interfaces/utils'

const StyledButton = styled.button`
  border: 1px solid rgb(217, 217, 217);
  border-radius: 2px;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  outline: none;
  background-color: white;
  color: var(--text-color);

  :hover,
  :focus {
    color: var(--primary-color-hover);
    border-color: var(--primary-color-hover);
  }

  :active {
    color: var(--primary-color-active);
    border-color: var(--primary-color-active);
  }

  transition: 0.3s;
`

type Props = {
  type?: 'primary'
}

const Button: React.FC<ReactWithChildRen & Props> = ({ children, type }) => {
  const className = type === 'primary' ? 'btn-primary' : ''

  return <StyledButton className={className}>{children}</StyledButton>
}

export default Button
