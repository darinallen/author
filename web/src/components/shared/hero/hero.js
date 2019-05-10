import React from 'react'
import { cn } from '../../../lib/helpers'

import styles from './hero.module.css'

const Hero = ({ image, titleTop, titleBottom, subtitle, grayscale, bottomAlign, leftAlign }) => {
  return (
    <div className={styles.root}>
      <img
        className={cn(
          styles.image,
          grayscale ? styles.grayscale : '',
          bottomAlign ? styles.bottomAlign : ''
        )}
        src={image}
      />
      <div className={styles.text}>
        <h1 className={styles.title}>
          <span className={styles.titleTop}>{titleTop}</span>
          <span className={styles.titleBottom}>{titleBottom}</span>
        </h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
    </div>
  )
}

export default Hero
