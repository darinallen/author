import React from 'react'
import { buildImageObj, getWritingUrl, getArtUrl, getPhotoUrl } from '../../../lib/helpers'
import { imageUrlFor } from '../../../lib/image-url'
import BlockContent from '../../block-content'
import ButtonLink from '../buttons/button-link.js'
import { Link } from 'gatsby'
import styles from './featured.module.css'

const Featured = ({ writingNodes, artNodes, photoNodes }) => (
  <div className={styles.root}>
    <h2 className={styles.sectionTitle}>Featured</h2>
    {writingNodes && writingNodes.map((node, index) => <FeaturedWriting node={node} key={index} />)}
    {artNodes && artNodes.map((node, index) => <FeaturedArt node={node} key={index} />)}
    {photoNodes && photoNodes.map((node, index) => <FeaturedPhoto node={node} key={index} />)}
  </div>
)

export default Featured

const FeaturedWriting = ({ node }) => (
  <div className={styles.item}>
    <div className={styles.grid}>
      <div className={styles.bookAndButtonContainer}>
        <Link to={getWritingUrl(node.slug.current)}>
          <img
            className={styles.bookCover}
            src={imageUrlFor(buildImageObj(node.mainImage))
              .width(220)
              .url()}
            alt={node.mainImage.alt}
          />
        </Link>
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
      <Link className={styles.figureContainer} to={getArtUrl(node.slug.current)}>
        <figure
          className={styles.figure}
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
            className={styles.image}
            src={imageUrlFor(buildImageObj(node.mainImage))
              .width(400)
              .url()}
            alt={node.mainImage.alt}
          />
        </figure>
      </Link>
      <div className={styles.text}>
        <h3 className={styles.title}>{node.title}</h3>
        {node._rawDescription && <BlockContent blocks={node._rawDescription} />}
      </div>
    </div>
  </div>
)

const FeaturedPhoto = ({ node }) => (
  <div className={styles.item}>
    <div className={styles.grid}>
      <Link className={styles.figureContainer} to={getPhotoUrl(node.slug.current)}>
        <figure
          className={styles.figure}
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
            className={styles.image}
            src={imageUrlFor(buildImageObj(node.mainImage))
              .width(400)
              .url()}
            alt={node.mainImage.alt}
          />
        </figure>
      </Link>
      <div className={styles.text}>
        <h3 className={styles.title}>{node.title}</h3>
        {node._rawDescription && <BlockContent blocks={node._rawDescription} />}
      </div>
    </div>
  </div>
)
