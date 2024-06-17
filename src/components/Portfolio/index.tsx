import React, {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {useTranslation} from 'next-i18next'
import PortfolioInfo from './PortfolioInfo'

import styles from './Portfolio.module.css'

type Language = 'en' | 'ru'

interface PortfolioItem {
  id: number
  category: Record<Language, string>
  imageUrl: string
  info: {
    title: Record<Language, string>
    text: Record<Language, string>
    url: string
  }
}

interface PortfolioProps {
  data: PortfolioItem[]
}

const Portfolio: React.FC<PortfolioProps> = ({data}) => {
  const [filter, setFilter] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const isoRef = useRef<Isotope | null>(null)

  const {t, i18n} = useTranslation('common')

  useEffect(() => {
    const initializeIsotope = async () => {
      const Isotope = (await import('isotope-layout')).default
      if (gridRef.current) {
        isoRef.current = new Isotope(gridRef.current, {
          itemSelector: `.${styles.item}`,
          layoutMode: 'fitRows',
        })
      }
    }

    initializeIsotope()

    return () => {
      if (isoRef.current) {
        isoRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (isoRef.current) {
      isoRef.current.arrange({
        filter: filter === t('all') ? '*' : `.${filter.replace(/\s+/g, '-')}`,
      })
    }
  }, [filter])

  const categories = [
    t('all'),
    ...Array.from(
      new Set(data.map((item) => item.category[i18n.language as Language]))
    ),
  ]

  return (
    <div className={styles.portfolio}>
      <div className={styles.tabs}>
        {categories.map((category, index) => (
          <div key={category}>
            <span
              key={category}
              onClick={() => setFilter(category)}
              className={`${styles.breadcrumb} ${
                filter === category ? styles.active : ''
              }`}
            >
              {category}
            </span>
            {index < categories.length - 1 && (
              <span style={{margin: '0 5px'}}> / </span>
            )}
          </div>
        ))}
      </div>
      <div ref={gridRef} className={styles.items}>
        {data.map((item) => (
          <div
            key={item.id}
            className={`${styles.item} ${item.category[
              i18n.language as Language
            ].replace(/\s+/g, '-')}`}
          >
            <div className={styles.imageContainer}>
              <Image
                src={item.imageUrl}
                width={300}
                height={300}
                alt={item.category[i18n.language as Language]}
                className={styles.image}
              />
              <div className={styles.info}>
                <PortfolioInfo
                  title={item.info.title[i18n.language as Language]}
                  text={item.info.text[i18n.language as Language]}
                  url={item.info.url}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio
