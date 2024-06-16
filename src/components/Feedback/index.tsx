import React from 'react'
import Link from 'next/link'
import styles from './Feedback.module.css'
import Info from '@/components/Info'
import Image from 'next/image'
import {useTranslation} from 'next-i18next'

export interface FeedbackData {
  feedback: {[key: string]: string}
  reporter: {
    name: {
      [key: string]: string
    }
    citeUrl: string
    photoUrl: string
  }
}

interface FeedbackProps {
  data: FeedbackData[]
}

const Feedback: React.FC<FeedbackProps> = ({data}) => {
  const {i18n} = useTranslation()
  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <div key={index} className={styles.feedbackItem}>
          <Info>
            <p className={styles.feedbackText}>
              {item.feedback[i18n.language]}
            </p>
          </Info>
          <div className={styles.reporter}>
            <Image
              src={item.reporter.photoUrl}
              alt='avatar'
              className={styles.avatar}
              width={40}
              height={40}
            />
            <p className={styles.reporterName}>
              {item.reporter.name[i18n.language]},
            </p>
            <Link
              className={styles.reporterUrl}
              target='_blank'
              rel='noopener noreferrer'
              href={item.reporter.citeUrl}
            >
              {item.reporter.citeUrl.replace('https://www.', '')}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Feedback
