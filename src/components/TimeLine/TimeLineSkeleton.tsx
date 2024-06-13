import React from 'react'
import styles from './TimeLineSkeleton.module.css'

const TimeLineSkeleton: React.FC = () => {
  return (
    <div className={styles.timeline}>
      {[...Array(4)].map((_, index) => (
        <div key={index} className={styles.timelineItem}>
          <div className={styles.dateSkeleton}></div>
          <div className={styles.contentSkeleton}></div>
        </div>
      ))}
    </div>
  )
}

export default TimeLineSkeleton