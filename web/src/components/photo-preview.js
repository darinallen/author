import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj, getPhotoUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './photo-preview.module.css'

const PhotoPreview = props => (
  <Link className={styles.root} to={getPhotoUrl(props.slug.current)}>
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
  </Link>
)

export default PhotoPreview
