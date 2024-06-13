import PhotoBox from '@/components/PhotoBox'
import Button from '@/components/Button'

import Link from 'next/link'

import {useRouter} from 'next/router'

import styles from './index.module.css'

export default function Inner() {
  const router = useRouter()

  return (
    <div>
      <div className={styles.buttonWow}>
        <Link
          target='_blank'
          rel='noopener noreferrer'
          href='https://science.nasa.gov/image-detail/37893980612-307324af83-o/'
        >
          Wow
        </Link>
      </div>
      <div className={styles.container}>
        <PhotoBox
          name='Sergey Gorin'
          title='Programmer. Creative. Thinker.'
          description='Solving problems isn not just about writing code; it is about understanding the issue, thinking critically, and crafting solutions that are both effective and efficient.'
          avatar='/assets/avatar.jpg'
        />
        <Button text='Know more' onClick={() => router.push('/home')} />
      </div>
    </div>
  )
}
