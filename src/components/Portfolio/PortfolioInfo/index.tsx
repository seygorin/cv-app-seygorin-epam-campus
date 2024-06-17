import React from 'react'
import Link from 'next/link'
import {useTranslation} from 'next-i18next'

import styles from './PortfolioInfo.module.css'


interface PortfolioInfoProps {
  title: string
  text: string
  url: string
}

const PortfolioInfo: React.FC<PortfolioInfoProps> = ({title, text, url}) => {
  const {t} = useTranslation('common')

  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <p>{text}</p>
      <Link
        className={styles.link}
        target='_blank'
        rel='noopener noreferrer'
        href={url}
      >
        {t('viewSource')}
      </Link>
    </div>
  )
}

export default PortfolioInfo
