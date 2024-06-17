import React from 'react'
import {useTranslation} from 'react-i18next'
import {ExperienceItem} from '@/store/experienceSlice'
import styles from './Expertise.module.css'

type Language = 'en' | 'ru'
interface ExpertiseProps {
  data: ExperienceItem[]
}

const Expertise: React.FC<ExpertiseProps> = ({data}) => {
  const {i18n} = useTranslation()

  return (
    <div className={styles.experience}>
      {data.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.leftColumn}>
            <h3>{item.info.company[i18n.language as Language]}</h3>
            <p>{item.date}</p>
          </div>
          <div className={styles.rightColumn}>
            <h3>{item.info.job[i18n.language as Language]}</h3>
            <p>{item.info.description[i18n.language as Language]}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Expertise
