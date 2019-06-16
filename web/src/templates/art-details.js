import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ArtDetails from '../components/art-details'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query ArtTemplateQuery($id: String!) {
    art: sanityArt(id: { eq: $id }) {
      id
      creationDate
      categories {
        _id
        title
      }
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
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
      title
      slug {
        current
      }
      _rawDescription
    }
  }
`

const ArtTemplate = props => {
  const { data, errors } = props
  const artDetails = data && data.art
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {artDetails && <SEO title={artDetails.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {artDetails && <ArtDetails {...artDetails} />}
    </Layout>
  )
}

export default ArtTemplate
