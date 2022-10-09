import { css } from 'styled-components'

export const btnPrimary = css`
  background-color: var(--primary-color);
  color: white;

  :hover,
  :focus {
    border-color: var(--primary-color-hover);
    background-color: var(--primary-color-hover);
    color: white;
  }

  :active {
    border-color: var(--primary-color-active);
    background-color: var(--primary-color-active);
    color: white;
  }
`

export const btnDanger = css``
