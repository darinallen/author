import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Hero from '../components/shared/hero/hero'
import art from '../components/shared/hero/art.png'
import PreviewGrid from '../components/shared/preview-grid'
import ArtPreview from '../components/art-preview'

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

  const artNodes = data && data.art && mapEdgesToNodes(data.art)

  return (
    <Layout>
      <SEO title='Art' />
      <Hero
        image={art}
        titleTop='Digital '
        titleBottom='Art'
        subtitle='Original Designs & Abstract Creations'
      />
      <Container>
        <h2 className={responsiveTitle2}>Art</h2>
        {artNodes && (
          <PreviewGrid>
            {artNodes && artNodes.map(node => <li key={node.id}>{<ArtPreview {...node} />}</li>)}
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
            }
            alt
          }
          title
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
