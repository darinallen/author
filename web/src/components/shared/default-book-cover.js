import React from 'react'
import { cn } from '../../lib/helpers'
import styles from './default-book-cover.module.css'

const DefaultBookCover = ({ title, hero }) => (
  <div className={hero ? cn(styles.root, styles.hero) : styles.root}>
    <div className={styles.edge} />
    <div className={styles.content}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
      </div>
      <span className={styles.author}>T Anthony Allen</span>
    </div>
  </div>
)

export default DefaultBookCover
