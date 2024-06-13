import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import styles from './Button.module.css'

interface ButtonProps {
  icon?: IconProp
  text?: string
  onClick?: () => void
  className?: string
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick, className, type, disabled }) => {
  return (
    <button type={type} disabled={disabled} className={`${styles.buttons} ${className}`} onClick={onClick}>
      {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
      {text}
    </button>
  )
}

export default Button
