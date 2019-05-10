import React from 'react'
import { cn } from '../../../lib/helpers'

import styles from './button.module.css'

const ButtonLink = ({ color, url, children }) => (
  <a className={cn(styles.root, styles[color])} href={url} target='_blank'>
    {children}
  </a>
)

ButtonLink.defaultProps = {
  url: 'https://www.amazon.com'
}

export default ButtonLink
