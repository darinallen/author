import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import PhotoDetails from '../components/photo-details'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  query PhotoTemplateQuery($id: String!) {
    photo: sanityPhoto(id: { eq: $id }) {
      id
      creationDate
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

const PhotoTemplate = props => {
  const { data, errors } = props
  const photoDetails = data && data.photo
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {photoDetails && <SEO title={photoDetails.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {photoDetails && <PhotoDetails {...photoDetails} />}
    </Layout>
  )
}

export default PhotoTemplate
