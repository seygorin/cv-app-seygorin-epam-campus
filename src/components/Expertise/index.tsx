import React from 'react'
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
  return (
    <div className={styles.experience}>
      {data.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.leftColumn}>
            <h3>{item.info.company}</h3>
            <p>{item.date}</p>
          </div>
          <div className={styles.rightColumn}>
            <h3>{item.info.job}</h3>
            <p>{item.info.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Expertise