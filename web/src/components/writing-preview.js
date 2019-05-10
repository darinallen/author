import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj, getWritingUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './writing-preview.module.css'

const WritingPreview = props => (
  <Link className={styles.root} to={getWritingUrl(props.slug.current)}>
    <div className={styles.header}>
      <h3 className={styles.title}>{props.title}</h3>
    </div>
    <div className={styles.content}>
      <div className={styles.bookCoverContainer}>
        <img
          className={styles.bookCover}
          src={imageUrlFor(buildImageObj(props.mainImage))
            .width(200)
            .url()}
          alt={props.mainImage.alt}
        />
      </div>
      <span className={styles.summary}>This is the book summary. It is a very exciting book!</span>
    </div>
  </Link>
)

export default WritingPreview
