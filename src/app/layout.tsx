import Head from 'next/head'

import type {PropsWithChildren} from 'react'

export function Layout({children}: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>CV APP: seygorin</title>
        <meta name='description' content='CV APP for YOU' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>{children}</main>
    </>
  )
}
