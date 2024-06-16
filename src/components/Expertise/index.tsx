import React from 'react'
import {useTranslation} from 'react-i18next'
import styles from './Expertise.module.css'

export interface ExperienceData {
  date: string
  info: {
    company: string
    job: string
    description: string
  }
}
interface ExpertiseProps {
  data: ExperienceData[]
}

const Expertise: React.FC<ExpertiseProps> = ({data}) => {
  const {i18n} = useTranslation()

  return (
    <div className={styles.experience}>
      {data.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.leftColumn}>
            <h3>
              {typeof item.info.company === 'object'
                ? item.info.company[i18n.language]
                : item.info.company}
            </h3>
            <p>{item.date}</p>
          </div>
          <div className={styles.rightColumn}>
            <h3>
              {typeof item.info.job === 'object'
                ? item.info.job[i18n.language]
                : item.info.job}
            </h3>
            <p>
              {typeof item.info.description === 'object'
                ? item.info.description[i18n.language]
                : item.info.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Expertise
