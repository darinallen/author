import React from 'react'
import DefaultBookCover from '../default-book-cover'
import { cn } from '../../../lib/helpers'

import styles from './hero.module.css'

const Hero = ({ image, titleTop, titleBottom, subtitle, grayscale, bottomAlign, leftAlign }) => {
  return (
    <div className={styles.root}>
      {image ? (
        <img
          className={cn(
            styles.image,
            grayscale ? styles.grayscale : '',
            bottomAlign ? styles.bottomAlign : ''
          )}
          src={image}
        />
      ) : (
        <DefaultBookCover title={subtitle} hero />
      )}
      <div className={styles.text}>
        <h1 className={styles.title}>
          <span className={styles.titleTop}>{titleTop}</span>
          <span className={styles.titleBottom}>{titleBottom}</span>
        </h1>
        {image && <h2 className={styles.subtitle}>{subtitle}</h2>}
      </div>
    </div>
  )
}

export default Hero
