import React from 'react'
import {useTheme} from 'next-themes'
import styles from './Info.module.css'

interface InfoProps {
  children: React.ReactNode
  arrow?: boolean
}

const Info: React.FC<InfoProps> = ({children, arrow = false}) => {
  const {theme} = useTheme()

  return (
    <div
      className={`${styles.info} ${theme === 'dark' ? styles.dark : ''} ${
        arrow ? styles.arrow : ''
      }`}
    >
      {children}
    </div>
  )
}

export default Info
