import React from 'react'
import Header from '@/fragments/header-layout'
import { ReactWithChildRen } from '@/interfaces/utils'

const Index: React.FC<ReactWithChildRen> = ({ children }) => {
  return <Header>{children}</Header>
}
export default Index
