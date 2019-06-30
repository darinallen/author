import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Hero from '../components/shared/hero/hero'
import Featured from '../components/shared/featured/featured'
import camera from '../components/shared/hero/camera.png'
import PreviewGrid from '../components/shared/preview-grid'
import LightboxGrid from '../components/lightbox-grid'

import { responsiveTitle2 } from '../components/typography.module.css'

const PhotosPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const photoNodes = data && data.photos && mapEdgesToNodes(data.photos)
  const featuredPhotoNodes = data && data.featuredPhotos && mapEdgesToNodes(data.featuredPhotos)
  const showFeatured = featuredPhotoNodes ? !!featuredPhotoNodes.length : false

  return (
    <Layout>
      <SEO title='Photos' />
      <Hero image={camera} titleTop='Digital ' titleBottom='Photos' subtitle='Styled & Enhanced' />
      {showFeatured && (
        <Container color='primary'>
          <Featured photoNodes={featuredPhotoNodes} />
        </Container>
      )}
      <Container>
        <h2 className={responsiveTitle2}>Photos</h2>
        {photoNodes && (
          <PreviewGrid>
            <LightboxGrid nodes={photoNodes} type='photo' />
          </PreviewGrid>
        )}
      </Container>
    </Layout>
  )
}

export default PhotosPage

export const query = graphql`
  query PhotosPageQuery {
    photos: allSanityPhoto(sort: { fields: [creationDate], order: DESC }) {
      edges {
        node {
          id
          creationDate
          mainImage {
            asset {
              _id
              url
              metadata {
                lqip
                dimensions {
                  aspectRatio
                }
              }
            }
            alt
          }
          featured
          title
          _rawDescription
          slug {
            current
          }
        }
      }
    }

    featuredPhotos: allSanityPhoto(limit: 3, filter: { featured: { eq: true } }) {
      edges {
        node {
          id
          creationDate
          mainImage {
            asset {
              _id
              url
              metadata {
                lqip
                dimensions {
                  aspectRatio
                }
              }
            }
            alt
          }
          featured
          title
          _rawDescription
          slug {
            current
          }
        }
      }
    }
  }
`
