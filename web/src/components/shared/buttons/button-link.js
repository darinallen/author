import React from 'react'
import { cn } from '../../../lib/helpers'

import styles from './button.module.css'

const ButtonLink = ({ color, children }) => (
  <a className={cn(styles.root, styles[color])} href='https://www.amazon.com' target='_blank'>
    {children}
  </a>
)

export default ButtonLink
