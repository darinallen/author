import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, getFeaturedNodes } from '../lib/helpers'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Hero from '../components/shared/hero/hero'
import tAnthony from '../components/shared/hero/tanthony.png'
import Container from '../components/container'
import PreviewGrid from '../components/shared/preview-grid'
import WritingPreview from '../components/writing-preview'
import ArtPreview from '../components/art-preview'
import Featured from '../components/featured'
import BlogPostPreview from '../components/blog-post-preview'
import styles from './index.module.css'
import typography from '../components/typography.module.css'

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs)
    : []

  const writingNodes = (data || {}).writing
    ? mapEdgesToNodes(data.writing).filter(filterOutDocsWithoutSlugs)
    : []

  const artNodes = (data || {}).art
    ? mapEdgesToNodes(data.art).filter(filterOutDocsWithoutSlugs)
    : []

  const featuredNodes = getFeaturedNodes(writingNodes, artNodes)
  const showFeatured = featuredNodes.writingNodes.length

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Hero
        image={tAnthony}
        titleTop='T Anthony '
        titleBottom='Allen'
        subtitle='Author & Digital Artist'
        bottomAlign
      />
      <Container>
        <h2 className={typography.responsiveTitle1}>Welcome</h2>
        <p className={styles.welcome}>
          Hello, and thank you for stopping by my website. This is a place where I will share recent
          creative works, including books, short stories, digital art, and blog posts. My writing
          covers a variety of genres, but I often weave in science fiction and fantasy themes. Blog
          posts cover everything from technology to politics and world events. Please feel free to
          drop me a note, and thanks so much for your interest!
        </p>
        {writingNodes && (
          <PreviewGrid title='Recent writing' browseMoreHref='/writing/'>
            {writingNodes &&
              writingNodes.map(node => (
                <li key={node.id}>
                  <WritingPreview {...node} />
                </li>
              ))}
          </PreviewGrid>
        )}
        {artNodes && (
          <PreviewGrid title='Recent art' browseMoreHref='/art/'>
            {artNodes &&
              artNodes.map(node => (
                <li key={node.id}>
                  <ArtPreview {...node} />
                </li>
              ))}
          </PreviewGrid>
        )}
      </Container>
      {showFeatured && (
        <Container color='primary'>
          <Featured nodes={featuredNodes} />
        </Container>
      )}
      <div className={!showFeatured ? styles.adjustUp : ''}>
        <Container>
          {postNodes && (
            <PreviewGrid title='Recent blog posts' browseMoreHref='/blog/'>
              {postNodes &&
                postNodes.map(node => (
                  <li key={node.id}>
                    <BlogPostPreview {...node} />
                  </li>
                ))}
            </PreviewGrid>
          )}
        </Container>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }

    posts: allSanityPost(limit: 6, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          publishedAt
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
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }

    writing: allSanityWriting(limit: 6, sort: { fields: [releaseDate], order: DESC }) {
      edges {
        node {
          id
          releaseDate
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          retailUrl
          featured
          _rawExcerpt
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

    art: allSanityArt(limit: 6, sort: { fields: [creationDate], order: DESC }) {
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
          featured
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
