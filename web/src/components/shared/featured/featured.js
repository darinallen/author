import React from 'react'
import { buildImageObj, cn, getWritingUrl, getArtUrl } from '../../../lib/helpers'
import { imageUrlFor } from '../../../lib/image-url'
import BlockContent from '../../block-content'
import ButtonLink from '../buttons/button-link.js'
import { Link } from 'gatsby'
import styles from './featured.module.css'

const Featured = ({ nodes, home }) => (
  <div className={cn(styles.root, home ? styles.home : '')}>
    <h2 className={styles.sectionTitle}>Featured</h2>
    {nodes.writingNodes &&
      nodes.writingNodes.map((node, index) => <FeaturedWriting node={node} key={index} />)}
    {nodes.artNodes && nodes.artNodes.map((node, index) => <FeaturedArt node={node} key={index} />)}
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
      <div className={styles.figureContainer}>
        <figure
          className={styles.artFigure}
          style={
            node.mainImage && {
              backgroundImage: `url(${node.mainImage.asset.metadata.lqip})`,
              paddingTop: `calc((100% / ${
                node.mainImage.asset.metadata.dimensions.aspectRatio
              }) - 2px)`
            }
          }
        >
          <img
            className={styles.art}
            src={imageUrlFor(buildImageObj(node.mainImage))
              .width(400)
              .url()}
            alt={node.mainImage.alt}
          />
        </figure>
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>{node.title}</h3>
        {node._rawDescription && <BlockContent blocks={node._rawDescription} />}
      </div>
    </div>
  </div>
)
