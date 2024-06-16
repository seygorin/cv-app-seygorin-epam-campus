import React, {useEffect, useCallback, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from '@/store/store'
import {fetchEducation} from '@/store/educationSlice'
import {fetchFeedback} from '@/store/feedbackSlice'
import {fetchExperience} from '@/store/experienceSlice'
import {fetchSkills} from '@/store/skillsSlice'

import Box from '@/components/Box'
import Expertise from '@/components/Expertise'
import ExpertiseSkeleton from '@/components/Expertise/ExpertiseSkeleton'
import Feedback from '@/components/Feedback'
import TimeLine from '@/components/TimeLine'
import TimeLineSkeleton from '@/components/TimeLine/TimeLineSkeleton'
import Address from '@/components/Address'
import Panel from '@/components/Panel'
import Portfolio from '@/components/Portfolio'
import Skills from '@/components/Skills'
import Button from '@/components/Button'
import Loading from '@/components/Loading'

import {faChevronUp} from '@fortawesome/free-solid-svg-icons'
import styles from './home.module.css'

import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetServerSideProps} from 'next'
import {useTranslation} from 'next-i18next'

export default function Home() {
  const {t} = useTranslation('common')
  const [isPanelOpen, setPanelOpen] = useState(true)

  const dispatch: AppDispatch = useDispatch()
  const education = useSelector((state: RootState) => state.education.data)
  const educationStatus = useSelector(
    (state: RootState) => state.education.status
  )

  const feedback = useSelector((state: RootState) => state.feedback.data)
  const feedbackStatus = useSelector(
    (state: RootState) => state.feedback.status
  )

  const experience = useSelector((state: RootState) => state.experience.data)
  const experienceStatus = useSelector(
    (state: RootState) => state.experience.status
  )

  const skillsStatus = useSelector((state: RootState) => state.skills.status)

  useEffect(() => {
    dispatch(fetchEducation())
    dispatch(fetchFeedback())
    dispatch(fetchExperience())
    dispatch(fetchSkills())
  }, [dispatch])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])

  const renderError = () => (
    <div className={styles.error}>{t('serverError')}</div>
  )

  return (
    <div className={styles.container}>
      <Panel isOpen={isPanelOpen} setIsOpen={setPanelOpen} />
      <div
        className={`${styles.mainContent} ${
          isPanelOpen ? styles.panelOpen : ''
        }`}
      >
        <Box
          id='about-me'
          title={t('aboutMe')}
          text={<div dangerouslySetInnerHTML={{__html: t('aboutMeText')}} />}
        />

        <Box
          id='education'
          title={t('education')}
          content={
            educationStatus === 'loading' ? (
              <TimeLineSkeleton />
            ) : educationStatus === 'failed' ? (
              renderError()
            ) : (
              <TimeLine data={education} />
            )
          }
        />
        <Box
          id='experience'
          title={t('experience')}
          content={
            experienceStatus === 'loading' ? (
              <ExpertiseSkeleton />
            ) : experienceStatus === 'failed' ? (
              renderError()
            ) : (
              <Expertise data={experience} />
            )
          }
        />
        <Box
          id='skills'
          title={t('skills')}
          content={
            skillsStatus === 'loading' ? (
              <Loading />
            ) : skillsStatus === 'failed' ? (
              renderError()
            ) : (
              <Skills />
            )
          }
        />
        <Box id='portfolio' title={t('portfolio')} content={<Portfolio />} />
        <Box id='contacts' title={t('contacts')} content={<Address />} />
        <Box
          id='feedbacks'
          title={t('feedbacks')}
          highlightedTitle={t('theoretically')}
          content={
            feedbackStatus === 'loading' ? (
              <Loading />
            ) : feedbackStatus === 'failed' ? (
              renderError()
            ) : (
              <Feedback data={feedback} />
            )
          }
        />
      </div>
      <Button
        icon={faChevronUp}
        onClick={scrollToTop}
        className={styles.scrollToTopButton}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'en',
}) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})
