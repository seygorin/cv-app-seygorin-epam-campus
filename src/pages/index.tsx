import Inner from '@/pages/inner'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetServerSideProps} from 'next'
export default function Home() {
  return <Inner />
}
export const getServerSideProps: GetServerSideProps = async ({
  locale = 'en',
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
