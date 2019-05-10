import { format, distanceInWords, differenceInDays } from 'date-fns'
import React, { useState } from 'react'
import Lightbox from 'react-images'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'

import styles from './art-details.module.css'

function ArtDetails (props) {
  const { _rawDescription, title, mainImage, creationDate } = props

  const [isExpanded, setIsExpanded] = useState(false)

  console.log({ mainImage })

  return (
    <div className={styles.root}>
      <Container>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.creationDate}>
          {differenceInDays(new Date(creationDate), new Date()) > 3
            ? distanceInWords(new Date(creationDate), new Date())
            : format(new Date(creationDate), 'MMMM Do YYYY')}
        </div>
        {mainImage && mainImage.asset && (
          <div className={styles.mainImage} onClick={() => setIsExpanded(true)}>
            <div className={styles.frame}>
              <img
                src={imageUrlFor(buildImageObj(mainImage))
                  .width(1200)
                  .url()}
                alt={mainImage.alt}
              />
            </div>
          </div>
        )}

        {mainImage && mainImage.asset && isExpanded && (
          <Lightbox
            images={[{ src: mainImage.asset.url }]}
            isOpen={isExpanded}
            onClose={() => setIsExpanded(false)}
            backdropClosesModal
            showImageCount={false}
          />
        )}
        {_rawDescription && <BlockContent blocks={_rawDescription} />}
      </Container>
    </div>
  )
}

export default ArtDetails
