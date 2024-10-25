import {useTranslation} from 'next-i18next'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import PhotoBox from '@/components/PhotoBox'
import Button from '@/components/Button'
import Loading from '@/components/Loading'

import styles from './index.module.css'

export default function Inner() {
  const {t} = useTranslation('common')
  const router = useRouter()

  const [imageLoading, setImageLoading] = useState(true)

  return (
    <>
      {imageLoading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
      <div
        className={styles.wrapper}
        style={{display: imageLoading ? 'none' : 'block'}}
      >
        <div className={styles.buttonWow}>
          <Link
            target='_blank'
            rel='noopener noreferrer'
            href='https://science.nasa.gov/image-detail/37893980612-307324af83-o/'
          >
            {t('wow')}
          </Link>
        </div>
        <div className={styles.backgroundImage}>
          <Image
            src='/assets/background.jpg'
            alt={t('background')}
            fill
            sizes='100vw'
            style={{objectFit: 'cover'}}
            quality={75}
            priority
            onLoad={() => {
              setImageLoading(false)
            }}
          />
        </div>
        <div className={styles.container}>
          <PhotoBox
            name={t('name')}
            title={t('programmerCreativeThinker')}
            description={t('problemSolvingDescription')}
            avatar='/assets/avatar.jpg'
          />
          <Button text={t('knowMore')} onClick={() => router.push('/home')} />
        </div>
      </div>
    </>
  )
}
