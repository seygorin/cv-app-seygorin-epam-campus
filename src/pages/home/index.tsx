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

export default function Home() {
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
          title='About me'
          text={
            <>
              I am <em> age &gt; 30 &amp;&amp; age &lt; 35</em>: solving
              problems and searching for solutions is what I love. After
              graduating from university at <em>Math.ceil(22.5)</em> with a
              degree in geology, I dove headfirst into the profession,
              navigating the challenging path of developing oil and gas fields
              and leading several subsoil use projects. These projects concluded
              with the successful completion of work and final presentations in
              various ministries in Kazakhstan. Five years flew by with
              excitement, but at some point, I realized that I was also
              irresistibly drawn to the virtual world, the world of complex
              algorithms and limitless possibilities –{' '}
              <span
                style={{
                  background:
                    'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                the world of programming
              </span>
              . <br />
              On my path to acquiring new knowledge, my trusty compass has been
              courses from{' '}
              <em>
                RS School, EPAM, and numerous courses on the Udemy platform
              </em>
              . Over years of theoretical training, I have come to understand a
              simple principle: <strong>practice &gt; theory</strong>. <br />
              The journey of a novice is thorny, but each success, whether it
              was developing a calculator or an online store, only fueled my
              interest. <br />
              Today, armed with knowledge of programming languages:{' '}
              <em>HTML, CSS, JS, and React/Redux</em>, I am ready for new
              challenges. My goal is to become part of a team that does not fear
              difficult tasks and strives to create truly innovative products.
              My experience as a geologist has taught me to think
              systematically, analyze large amounts of information, and find
              unconventional solutions - qualities that I am confident will be
              valuable in the IT world.
            </>
          }
        />

        <Box
          id='education'
          title='Education'
          content={
            educationStatus === 'loading' ? (
              <TimeLineSkeleton />
            ) : (
              <TimeLine data={education} />
            )
          }
        />
        <Box
          id='experience'
          title='Experience'
          content={
            experienceStatus === 'loading' ? (
              <ExpertiseSkeleton />
            ) : (
              <Expertise data={experience} />
            )
          }
        />
        <Box
          id='skills'
          title='Skills'
          content={skillsStatus === 'loading' ? <Loading /> : <Skills />}
        />
        <Box id='portfolio' title='Portfolio' content={<Portfolio />} />
        <Box id='contacts' title='Contacts' content={<Address />} />
        <Box
          id='feedbacks'
          title='Feedback'
          highlightedTitle='theoretically'
          content={
            feedbackStatus === 'loading' ? (
              <Loading />
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
