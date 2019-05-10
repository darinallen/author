import React from 'react'
import { cn } from '../../../lib/helpers'

import styles from './button.module.css'

const Button = ({ color, onClick, className, children }) => (
  <button className={cn(styles.root, styles[color], className)} onClick={onClick}>
    {children}
  </button>
)

export default Button
