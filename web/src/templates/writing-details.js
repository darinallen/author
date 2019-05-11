import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import WritingDetails from '../components/writing-details'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query WritingTemplateQuery($id: String!) {
    writing: sanityWriting(id: { eq: $id }) {
      id
      releaseDate
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
        }
        alt
      }
      title
      classification
      retailUrl
      slug {
        current
      }
      _rawSummary
      _rawExcerpt
      authors {
        _key
        person {
          image {
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
            }
          }
          name
        }
        roles
      }
    }
  }
`

const WritingTemplate = props => {
  const { data, errors } = props
  const writingDetails = data && data.writing
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {writingDetails && <SEO title={writingDetails.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {writingDetails && <WritingDetails {...writingDetails} />}
    </Layout>
  )
}

export default WritingTemplate
