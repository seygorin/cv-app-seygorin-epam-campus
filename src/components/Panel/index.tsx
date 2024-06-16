import React, {useState, useEffect, useRef} from 'react'
import {useMediaQuery} from 'react-responsive'
import {useTheme} from 'next-themes'
import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'

import Navigation from '../Navigation'
import Button from '../Button'
import PhotoBox from '../PhotoBox'

import styles from './Panel.module.css'

import {
  faChevronLeft,
  faBars,
  faSun,
  faMoon,
  faCog,
  faLanguage,
} from '@fortawesome/free-solid-svg-icons'

interface PanelProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Panel: React.FC<PanelProps> = ({isOpen, setIsOpen}) => {
  const [isScreenSmall, setIsScreenSmall] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const isSmall = useMediaQuery({query: '(max-width: 600px)'})

  const {theme, setTheme} = useTheme()
  const router = useRouter()
  const {t, i18n} = useTranslation('common')

  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsScreenSmall(isSmall)
  }, [isSmall])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [settingsRef])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const goBack = () => {
    router.push('/')
  }

  const switchLanguage = async () => {
    const nextLocale = i18n.language === 'en' ? 'ru' : 'en'
    await i18n.changeLanguage(nextLocale)
    router.push(router.pathname, router.asPath, {locale: nextLocale})
  }

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev)
  }

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={toggleOpen}
        icon={faBars}
        className={`${styles.topButton} ${
          !isOpen ? styles.topButtonClose : ''
        }`}
      />

      <div
        ref={settingsRef}
        className={`${styles.settingsContainer} ${
          isSettingsOpen ? styles.opened : ''
        }`}
      >
        <Button
          icon={faLanguage}
          onClick={switchLanguage}
          className={styles.button}
        />
        <Button
          icon={theme === 'dark' ? faSun : faMoon}
          onClick={toggleTheme}
          className={styles.button}
        />
      </div>

      <div className={`${styles.panel} ${!isOpen ? styles.open : ''}`}>
        <PhotoBox
          name={isScreenSmall ? '' : t('name')}
          avatar='/assets/avatar.jpg'
        />
        <Navigation />

        <div className={styles.buttonContainer}>
          <Button
            icon={faCog}
            text={isScreenSmall ? '' : t('settings')}
            onClick={toggleSettings}
            className={styles.button}
            disabled={isSettingsOpen}
          />
          <Button
            text={isScreenSmall ? '' : t('goBack')}
            icon={faChevronLeft}
            onClick={goBack}
            className={styles.button}
          />
        </div>
      </div>
    </div>
  )
}

export default Panel
