import React from 'react'
import { buildImageObj, getWritingUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import ButtonLink from './shared/buttons/button-link.js'
import ArtPreview from './art-preview'
// import { Link } from 'gatsby'
// import { buildImageObj, getWritingUrl } from '../lib/helpers'
// import { imageUrlFor } from '../lib/image-url'
import styles from './featured.module.css'

const Featured = ({ nodes }) => (
  <div className={styles.root}>
    <h2>Featured Book</h2>
    {nodes.writingNodes.map((node, index) => (
      <FeaturedWriting node={node} key={index} />
    ))}
    {/* {nodes.artNodes.map((node, index) => (
      <FeaturedArt node={node} key={index} />
    ))} */}
  </div>
)

export default Featured

const FeaturedWriting = ({ node }) => (
  <div className={styles.item}>
    <div className={styles.grid}>
      <div className={styles.bookAndButtonContainer}>
        <img
          className={styles.bookCover}
          src={imageUrlFor(buildImageObj(node.mainImage))
            .width(220)
            .url()}
          alt={node.mainImage.alt}
        />
        {node.retailUrl && (
          <div className={styles.button}>
            <ButtonLink color='accent' url={node.retailUrl}>
              Buy Now
            </ButtonLink>
          </div>
        )}
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>{node.title}</h3>
        <BlockContent blocks={node._rawSummary} />
      </div>
    </div>
  </div>
)

const FeaturedArt = ({ node }) => (
  <div className={styles.item}>
    <div className={styles.grid}>
      <ArtPreview className={'featured'} {...node} />
      <div className={styles.text}>
        <h3 className={styles.title}>{node.title}</h3>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
          Curabitur vulputate, nisl nec sagittis cursus, dui lectus scelerisque dolor, id interdum
          enim magna id nisi. Nam convallis vehicula tellus ut consequat. Nam sagittis odio vel odio
          commodo, sed laoreet nisl cursus. Praesent malesuada commodo magna, et vulputate tortor
          auctor vel. Phasellus aliquet nulla quis sem gravida euismod. Pellentesque in scelerisque
          augue, eget fermentum nisl.>
        </p>
      </div>
    </div>
  </div>
)
