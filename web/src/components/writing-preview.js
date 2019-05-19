import React from 'react'
import { Link } from 'gatsby'
import DefaultBookCover from './shared/default-book-cover'
import { buildImageObj, getWritingUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './writing-preview.module.css'

const WritingPreview = props => {
  return (
    <Link className={styles.root} to={getWritingUrl(props.slug.current)}>
      <div className={styles.header}>
        <h3 className={styles.title}>{props.title}</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.bookCoverContainer}>
          {props.mainImage ? (
            <img
              className={styles.bookCover}
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(200)
                .url()}
              alt={props.mainImage.alt}
            />
          ) : (
            <DefaultBookCover title={props.title} />
          )}
        </div>
        <div className={styles.preview}>
          <span className={styles.previewText}>{props.preview}</span>
        </div>
      </div>
    </Link>
  )
}

export default WritingPreview
