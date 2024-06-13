import React from 'react'
import styles from './Address.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {
  faTelegram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

const Address: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <FontAwesomeIcon icon={faPhone} className={styles.icon} />
        <div className={styles.item}>
          <a href='tel:+88802395746' className={styles.bold}>
            +888 0239 5746
          </a>
        </div>
      </div>

      <div className={styles.itemContainer}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
        <div className={styles.item}>
          <a href='mailto:seygorin@gmail.com' className={styles.bold}>
            seygorin@gmail.com
          </a>
        </div>
      </div>

      <div className={styles.itemContainer}>
        <FontAwesomeIcon icon={faTelegram} className={styles.icon} />
        <div className={styles.item}>
          <a
            href='https://t.me/seygorin'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.bold}
          >
            Telegram
          </a>
          <a
            href='https://t.me/seygorin'
            target='_blank'
            rel='noopener noreferrer'
          >
            www.telegram.org
          </a>
        </div>
      </div>

      <div className={styles.itemContainer}>
        <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
        <div className={styles.item}>
          <a
            href='https://www.linkedin.com/in/sergey-gorin/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.bold}
          >
            LinkedIn
          </a>
          <a
            href='https://www.linkedin.com/in/sergey-gorin/'
            target='_blank'
            rel='noopener noreferrer'
          >
            www.linkedin.com
          </a>
        </div>
      </div>
    </div>
  )
}

export default Address
