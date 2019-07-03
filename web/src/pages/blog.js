import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, filterNodesByEnv } from '../lib/helpers'
import PreviewGrid from '../components/shared/preview-grid'
import BlogPostPreview from '../components/blog-post-preview'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Hero from '../components/shared/hero/hero'
import blog from '../components/shared/hero/blog.png'
import Layout from '../containers/layout'

import { responsiveTitle2 } from '../components/typography.module.css'

const BlogPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes =
    data &&
    data.posts &&
    mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterNodesByEnv)

  return (
    <Layout>
      <SEO title='Blog' />
      <Hero image={blog} titleTop='Blog ' titleBottom='Posts' subtitle='Thoughts & Opinions' />
      <Container>
        <h2 className={responsiveTitle2}>Latest Posts</h2>
        <PreviewGrid>
          {postNodes &&
            postNodes.map(node => (
              <li key={node.id}>
                <BlogPostPreview {...node} />
              </li>
            ))}
        </PreviewGrid>
      </Container>
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query BlogPageQuery {
    posts: allSanityPost(limit: 12, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          environment
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`
