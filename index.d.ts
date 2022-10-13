import 'styled-components'
import theme from '@/lib/utils/theme'

type Theme = typeof theme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    CODE_SALT: string
    HASH_TOKEN_SECRET: string
    IV: string
  }
}
