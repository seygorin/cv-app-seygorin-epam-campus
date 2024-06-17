import Inner from '@/pages/inner'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticProps} from 'next'

export default function Home() {
  return <Inner />
}
export const getStaticProps: GetStaticProps = async ({locale = 'en'}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
