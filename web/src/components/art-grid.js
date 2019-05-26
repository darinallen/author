import React, { useState } from 'react'
import Lightbox from 'react-images'
import { navigate } from 'gatsby'
import { getArtUrl } from '../lib/helpers'
import ArtPreview from './art-preview'

const ArtGrid = ({ nodes }) => {
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

  return (
    <>
      {nodes &&
        nodes.map((node, index) => (
          <li key={node.id}>{<ArtPreview {...node} onClick={() => expandLightbox(index)} />}</li>
        ))}
      {isExpanded && (
        <Lightbox
          images={imageUrls}
          isOpen={isExpanded}
          currentImage={lightboxIndex}
          onClickPrev={() => goToPrev(lightboxIndex)}
          onClickNext={() => goToNext(lightboxIndex)}
          onClose={() => setIsExpanded(false)}
          onClickImage={() => navigate(getArtUrl(nodes[lightboxIndex].slug.current))}
          backdropClosesModal
        />
      )}
    </>
  )
}

export default ArtGrid
