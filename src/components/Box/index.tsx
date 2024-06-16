import React, {ReactNode} from 'react'

import {useTheme} from 'next-themes'

import styles from './Box.module.css'

interface BoxProps {
  title: string
  content?: ReactNode
  id?: string
	text?: ReactNode;
  highlightedTitle?: string
}

const Box: React.FC<BoxProps> = ({
  title,
  content,
  text,
  id,
  highlightedTitle,
}) => {
  const {theme} = useTheme()

  return (
    <div
      className={`${styles.box} ${theme === 'dark' ? styles.dark : ''}`}
      id={id}
    >
      <h2 className={styles.title}>
        {title}
        {highlightedTitle && (
          <span className={styles.highlightedTitle}> {highlightedTitle}</span>
        )}
      </h2>
      <div className={styles.content}>{content}</div>
      {text}
    </div>
  )
}

export default Box
