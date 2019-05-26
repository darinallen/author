import React from 'react'
import { buildImageObj, cn } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './art-preview.module.css'

const ArtPreview = props => (
  <div className={styles.root} onClick={props.onClick}>
    <div className={cn(styles.frame, props.className ? styles[props.className] : '')}>
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
  </div>
)

export default ArtPreview
