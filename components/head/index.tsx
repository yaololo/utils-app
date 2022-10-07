import * as React from 'react'
import Head from 'next/head'

// OG 150-160 characters
// Schema markup
type LayoutProps = {
  // no more than 50 -60 chars
  title?: string

  // no more than 150 -160 chars
  description: string
}

const Layout: React.FC<LayoutProps> = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Head>
)

export default Layout
