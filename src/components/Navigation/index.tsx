import {useEffect, useState} from 'react'
import {useMediaQuery} from 'react-responsive'
import Link from 'next/link'
import Button from '@/components/Button'

import styles from './Navigation.module.css'

import {
  faUser,
  faGraduationCap,
  faBriefcase,
  faCogs,
  faImages,
  faEnvelope,
  faComments,
} from '@fortawesome/free-solid-svg-icons'

const Navigation: React.FC = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false)
  const isSmall = useMediaQuery({query: '(max-width: 600px)'})
	
  useEffect(() => {
    setIsScreenSmall(isSmall)
  }, [isSmall])

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link href='#about-me'>
            <Button
              icon={faUser}
              className={styles.button}
              text={isScreenSmall ? '' : 'About me'}
            />
          </Link>
        </li>
        <li>
          <Link href='#education'>
            <Button
              icon={faGraduationCap}
              className={styles.button}
              text={isScreenSmall ? '' : 'Education'}
            />
          </Link>
        </li>
        <li>
          <Link href='#experience'>
            <Button
              icon={faBriefcase}
              className={styles.button}
              text={isScreenSmall ? '' : 'Experience'}
            />
          </Link>
        </li>
        <li>
          <Link href='#skills'>
            <Button
              icon={faCogs}
              className={styles.button}
              text={isScreenSmall ? '' : 'Skills'}
            />
          </Link>
        </li>
        <li>
          <Link href='#portfolio'>
            <Button
              icon={faImages}
              className={styles.button}
              text={isScreenSmall ? '' : 'Portfolio'}
            />
          </Link>
        </li>
        <li>
          <Link href='#contacts'>
            <Button
              icon={faEnvelope}
              className={styles.button}
              text={isScreenSmall ? '' : 'Contacts'}
            />
          </Link>
        </li>
        <li>
          <Link href='#feedbacks'>
            <Button
              icon={faComments}
              className={styles.button}
              text={isScreenSmall ? '' : 'Feedbacks'}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
