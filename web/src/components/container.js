import React from 'react'
import { cn } from '../lib/helpers'

import styles from './container.module.css'

const Container = ({ color, children }) => {
  return (
    <div className={cn(styles.root, styles[color])}>
      <div className={styles.box}>{children}</div>
    </div>
  )
}

Container.defaultProps = {
  color: 'white'
}

export default Container
