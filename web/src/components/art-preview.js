import React from 'react'
import { Link } from 'gatsby'
import { buildImageObj, getArtUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './art-preview.module.css'

const ArtPreview = props => (
  <Link className={styles.root} to={getArtUrl(props.slug.current)}>
    <div className={styles.frame}>
      <figure
        className={styles.artFigure}
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
          className={styles.art}
          src={imageUrlFor(buildImageObj(props.mainImage))
            .width(400)
            .url()}
          alt={props.mainImage.alt}
        />
      </figure>
    </div>
  </Link>
)

export default ArtPreview
