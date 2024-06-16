import React, {useEffect, useState} from 'react'
import {appWithTranslation, useTranslation} from 'next-i18next'
import {Provider} from 'react-redux'
import {store} from '@/store/store'
import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes'
import {Layout} from '../app/layout'
import {Comic_Neue, Exo_2} from 'next/font/google'
import '../app/globals.css'
import '../../next-i18next.config'

const comicNeue = Comic_Neue({weight: ['400', '700'], subsets: ['latin']})
const openSans = Exo_2({weight: ['300', '600'], subsets: ['cyrillic']})

const App = ({Component, pageProps}: AppProps) => {
  const {i18n} = useTranslation()
  const [fontClass, setFontClass] = useState(comicNeue.className)

  useEffect(() => {
    setFontClass(
      i18n.language === 'ru' ? openSans.className : comicNeue.className
    )
  }, [i18n.language])

  return (
    <Provider store={store}>
      <ThemeProvider attribute='class'>
        <Layout>
          <div className={fontClass}>
            <Component {...pageProps} />
          </div>
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default appWithTranslation(App)
