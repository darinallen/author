import React, { useState } from 'react'
import Lightbox from 'react-images'
import { navigate } from 'gatsby'
import { getArtUrl, getPhotoUrl } from '../lib/helpers'
import ArtPreview from './art-preview'
import PhotoPreview from './photo-preview'

const LightboxGrid = ({ nodes, type }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const imageUrls = nodes.map(node => ({ src: node.mainImage.asset.url }))

  const expandLightbox = index => {
    setIsExpanded(true)
    setLightboxIndex(index)
  }

  const goToPrev = currentIndex => {
    setLightboxIndex(--currentIndex)
  }

  const goToNext = currentIndex => {
    setLightboxIndex(++currentIndex)
  }

  const getUrl = type === 'art' ? getArtUrl : getPhotoUrl

  return (
    <>
      {nodes &&
        nodes.map((node, index) => (
          <li key={node.id}>
            {type === 'art' ? (
              <ArtPreview {...node} onClick={() => expandLightbox(index)} />
            ) : (
              <PhotoPreview {...node} onClick={() => expandLightbox(index)} />
            )}
          </li>
        ))}
      {isExpanded && (
        <Lightbox
          images={imageUrls}
          isOpen={isExpanded}
          currentImage={lightboxIndex}
          onClickPrev={() => goToPrev(lightboxIndex)}
          onClickNext={() => goToNext(lightboxIndex)}
          onClose={() => setIsExpanded(false)}
          onClickImage={() => navigate(getUrl(nodes[lightboxIndex].slug.current))}
          backdropClosesModal
        />
      )}
    </>
  )
}

export default LightboxGrid
