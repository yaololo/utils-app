import React from 'react'

import styled from 'styled-components'
type Props = {
  height?: string
  color?: string
  margin?: string
}

const Element = styled.div<{ lineColor?: string; lineHeight?: string }>`
  display: block;
  clear: both;
  width: 100%;
  min-width: 100%;
  height: ${(p) => p.lineHeight || '1px'};
  background: ${(p) => p.lineColor || 'var(--divider)'};
`

const Divider: React.FC<Props> = ({ color, height }) => (
  <Element className="divider" lineColor={color} lineHeight={height}></Element>
)

export default Divider
