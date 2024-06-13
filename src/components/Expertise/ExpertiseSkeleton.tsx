import React from 'react'
import styles from './ExpertiseSkeleton.module.css'

const ExpertiseSkeleton: React.FC = () => {
  return (
    <div className={styles.experience}>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={styles.item} data-testid='skeleton-item'>
            <div className={styles.leftColumn}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonBigText}></div>

            </div>
          </div>
        ))}
    </div>
  )
}

export default ExpertiseSkeleton
