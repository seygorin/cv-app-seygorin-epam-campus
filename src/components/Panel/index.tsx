import React, {useState, useEffect} from 'react'
import {useMediaQuery} from 'react-responsive'
import {useTheme} from 'next-themes'
import {useRouter} from 'next/router'

import Navigation from '../Navigation'
import Button from '../Button'
import PhotoBox from '../PhotoBox'
import styles from './Panel.module.css'

import {
  faChevronLeft,
  faBars,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons'

interface PanelProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Panel: React.FC<PanelProps> = ({isOpen, setIsOpen}) => {
	
  const [isScreenSmall, setIsScreenSmall] = useState(false)
  const isSmall = useMediaQuery({query: '(max-width: 600px)'})

  const {theme, setTheme} = useTheme()
  const router = useRouter()

  useEffect(() => {
    setIsScreenSmall(isSmall)
  }, [isSmall])
	
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const goBack = () => {
    router.push('/')
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
      <div className={`${styles.panel} ${!isOpen ? styles.open : ''}`}>
        <PhotoBox name={isScreenSmall ? '' : 'Sergey Gorin'} avatar="/assets/avatar.jpg" />
        <Navigation />
        <div className={styles.buttonContainer}>
          <Button
            icon={theme === 'dark' ? faSun : faMoon}
            onClick={toggleTheme}
            className={styles.button}
          />
          <Button
            text={isScreenSmall ? '' : 'Go back'}
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
