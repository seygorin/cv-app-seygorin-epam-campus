import React from 'react'
import styles from './TimeLine.module.css'
import Info from '@/components/Info'
import {useTranslation} from 'next-i18next'

type Language = 'en' | 'ru'
export interface TimeLineData {
  date: number
  title: Record<Language, string>
  text: Record<Language, string>
}

interface TimeLineProps {
  data: TimeLineData[]
}

const TimeLine: React.FC<TimeLineProps> = ({data}) => {
  const {i18n} = useTranslation()

  return (
    <div className={styles.timeline} data-testid='timeline'>
      {data.map((item, index) => (
        <div
          key={index}
          className={styles.timelineItem}
          data-testid={`timeline-item-${index}`}
        >
          <div className={styles.date}>{item.date}</div>
          <div className={styles.content}>
            <Info arrow>
              <h4>{item.title[i18n.language as Language]}</h4>
              <p>{item.text[i18n.language as Language]}</p>
            </Info>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TimeLine
