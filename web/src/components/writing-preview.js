import React from 'react'
import { Link } from 'gatsby'
import DefaultBookCover from './shared/default-book-cover'
import { buildImageObj, getWritingUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './writing-preview.module.css'

const WritingPreview = props => {
  return (
    <Link className={styles.root} to={getWritingUrl(props.slug.current)}>
      <div className={styles.content}>
        <figure
          className={styles.bookCoverFigure}
          style={
            props.mainImage
              ? {
                backgroundImage: `url(${props.mainImage.asset.metadata.lqip})`,
                paddingTop: `calc(100% / ${
                  props.mainImage.asset.metadata.dimensions.aspectRatio
                })`
              }
              : { paddingTop: '160%' }
          }
        >
          {props.mainImage ? (
            <img
              className={styles.bookCover}
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(350)
                .url()}
              alt={props.mainImage.alt}
            />
          ) : (
            <DefaultBookCover title={props.title} />
          )}
        </figure>
        <h3 className={styles.title}>{props.title}</h3>
      </div>
    </Link>
  )
}

export default WritingPreview
