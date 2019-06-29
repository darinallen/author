import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './photo-preview.module.css'

const PhotoPreview = props => (
  <div className={styles.root} onClick={props.onClick}>
    <figure
      className={styles.photoFigure}
      style={
        props.mainImage && {
          backgroundImage: `url(${props.mainImage.asset.metadata.lqip})`,
          paddingTop: `calc((100% / ${
            props.mainImage.asset.metadata.dimensions.aspectRatio
          }) - 2px)`
        }
      }
    >
      <img
        className={styles.photo}
        src={imageUrlFor(buildImageObj(props.mainImage))
          .width(400)
          .url()}
        alt={props.mainImage.alt}
      />
    </figure>
  </div>
)

export default PhotoPreview
