import React from 'react'
import {Provider} from 'react-redux'
import {store} from '@/store/store'
import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes'
import {Layout} from '../app/layout'

import '../app/globals.css'

const App = ({Component, pageProps}: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class'>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default App
