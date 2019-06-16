import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, getFeaturedNodes } from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Hero from '../components/shared/hero/hero'
import Featured from '../components/shared/featured/featured'
import typewriter from '../components/shared/hero/typewriter.png'
import PreviewGrid from '../components/shared/preview-grid'
import WritingPreview from '../components/writing-preview'

import { responsiveTitle2 } from '../components/typography.module.css'

const WritingPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const writingNodes = data && data.writing && mapEdgesToNodes(data.writing)
  const featuredNodes = getFeaturedNodes({ writingNodes })
  const showFeatured = featuredNodes.writingNodes ? !!featuredNodes.writingNodes.length : false

  return (
    <Layout>
      <SEO title='Writing' />
      <Hero
        image={typewriter}
        titleTop='Written '
        titleBottom='Works'
        subtitle='Books & Flash Fiction'
      />
      {showFeatured && (
        <Container color='primary'>
          <Featured nodes={featuredNodes} />
        </Container>
      )}
      <Container>
        <h2 className={responsiveTitle2}>Writing</h2>
        {writingNodes && (
          <PreviewGrid>
            {writingNodes &&
              writingNodes.map(node => (
                <li key={node.id}>
                  <WritingPreview {...node} />
                </li>
              ))}
          </PreviewGrid>
        )}
      </Container>
    </Layout>
  )
}

export default WritingPage

export const query = graphql`
  query WritingPageQuery {
    writing: allSanityWriting(sort: { fields: [releaseDate], order: DESC }) {
      edges {
        node {
          id
          releaseDate
          mainImage {
            asset {
              _id
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
          retailUrl
          preview
          _rawSummary
          _rawExcerpt
          slug {
            current
          }
          categories {
            title
            id
          }
        }
      }
    }
  }
`
