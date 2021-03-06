import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, filterNodesByEnv } from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Hero from '../components/shared/hero/hero'
import Featured from '../components/shared/featured/featured'
import art from '../components/shared/hero/art.png'
import PreviewGrid from '../components/shared/preview-grid'
import LightboxGrid from '../components/lightbox-grid'

import { responsiveTitle2 } from '../components/typography.module.css'

const ArtPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const artNodes =
    data &&
    data.art &&
    mapEdgesToNodes(data.art)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterNodesByEnv)
  const featuredArtNodes =
    data &&
    data.featuredArt &&
    mapEdgesToNodes(data.featuredArt)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterNodesByEnv)
  const showFeatured = featuredArtNodes ? !!featuredArtNodes.length : false

  return (
    <Layout>
      <SEO title='Art' />
      <Hero
        image={art}
        titleTop='Digital '
        titleBottom='Art'
        subtitle='Original Designs & Abstract Creations'
      />

      {showFeatured && (
        <Container color='primary'>
          <Featured artNodes={featuredArtNodes} />
        </Container>
      )}
      <Container>
        <h2 className={responsiveTitle2}>Art</h2>
        {artNodes && (
          <PreviewGrid>
            <LightboxGrid nodes={artNodes} type='art' />
          </PreviewGrid>
        )}
      </Container>
    </Layout>
  )
}

export default ArtPage

export const query = graphql`
  query ArtPageQuery {
    art: allSanityArt(sort: { fields: [creationDate], order: DESC }) {
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
          environment
          _rawDescription
          slug {
            current
          }
          categories {
            title
          }
        }
      }
    }

    featuredArt: allSanityArt(limit: 3, filter: { featured: { eq: true } }) {
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
          environment
          _rawDescription
          slug {
            current
          }
          categories {
            title
          }
        }
      }
    }
  }
`
