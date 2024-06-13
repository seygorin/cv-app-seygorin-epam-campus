import React, {useEffect, useState} from 'react'
import {useMediaQuery} from 'react-responsive'

import Image from 'next/image'
import {StaticImageData} from 'next/image'

import styles from './PhotoBox.module.css'

interface PhotoBoxProps {
  name: string
  title?: string
  description?: string
  avatar: StaticImageData | string
}

const PhotoBox: React.FC<PhotoBoxProps> = ({
  name,
  title,
  description,
  avatar,
}) => {
  const [isScreenSmall, setIsScreenSmall] = useState(false)

  const isSmall = useMediaQuery({query: '(max-width: 600px)'})

  useEffect(() => {
    setIsScreenSmall(isSmall)
  }, [isSmall])

  return (
    <div className={styles.photoBox}>
      <Image
        src={avatar}
        alt={name}
        className={styles.avatar}
        width={isScreenSmall ? 30 : 100}
        height={isScreenSmall ? 30 : 100}
      />
      <h2 className={styles.name}>{name}</h2>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

export default PhotoBox
