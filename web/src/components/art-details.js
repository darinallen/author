import { format, distanceInWords, differenceInDays } from 'date-fns'
import React, { useState } from 'react'
import Lightbox from 'react-images'
import Disqus from 'disqus-react'
import { buildImageObj, getArtUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'

import styles from './art-details.module.css'

function ArtDetails (props) {
  const { id, _rawDescription, title, mainImage, creationDate } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const disqusShortname = process.env.GATSBY_DISQUS_SHORTNAME

  const disqusConfig = {
    url: `${process.env.GATSBY_BASE_URL}${getArtUrl(props.slug.current)}`,
    identifier: id,
    title
  }

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
          <div className={styles.mainImage}>
            <div className={styles.frame} onClick={() => setIsExpanded(true)}>
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
                  src={imageUrlFor(buildImageObj(mainImage))
                    .width(1200)
                    .url()}
                  alt={mainImage.alt}
                />
              </figure>
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
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </Container>
    </div>
  )
}

export default ArtDetails
