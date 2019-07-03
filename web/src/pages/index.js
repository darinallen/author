import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, filterNodesByEnv } from '../lib/helpers'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import BlockContent from '../components/block-content'
import Hero from '../components/shared/hero/hero'
import tAnthony from '../components/shared/hero/tanthony.png'
import Container from '../components/container'
import PreviewGrid from '../components/shared/preview-grid'
import WritingPreview from '../components/writing-preview'
import LightboxGrid from '../components/lightbox-grid'
import Featured from '../components/shared/featured/featured'
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
  const page = (data || {}).page

  let postNodes,
    writingNodes,
    featuredWritingNodes,
    artNodes,
    featuredArtNodes,
    photoNodes,
    featuredPhotoNodes

  if (process.env.GATSBY_ACTIVE_ENV === 'production') {
    postNodes = (data || {}).prodPosts
      ? mapEdgesToNodes(data.prodPosts).filter(filterOutDocsWithoutSlugs)
      : []

    writingNodes = (data || {}).prodWriting
      ? mapEdgesToNodes(data.prodWriting).filter(filterOutDocsWithoutSlugs)
      : []

    featuredWritingNodes = (data || {}).prodFeaturedWriting
      ? mapEdgesToNodes(data.prodFeaturedWriting).filter(filterOutDocsWithoutSlugs)
      : []

    artNodes = (data || {}).prodArt
      ? mapEdgesToNodes(data.prodArt).filter(filterOutDocsWithoutSlugs)
      : []

    featuredArtNodes = (data || {}).prodFeaturedArt
      ? mapEdgesToNodes(data.prodFeaturedArt).filter(filterOutDocsWithoutSlugs)
      : []

    photoNodes = (data || {}).prodPhotos
      ? mapEdgesToNodes(data.prodPhotos).filter(filterOutDocsWithoutSlugs)
      : []

    featuredPhotoNodes = (data || {}).prodFeaturedPhotos
      ? mapEdgesToNodes(data.prodFeaturedPhotos).filter(filterOutDocsWithoutSlugs)
      : []
  } else {
    postNodes = (data || {}).posts
      ? mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs)
      : []

    writingNodes = (data || {}).writing
      ? mapEdgesToNodes(data.writing).filter(filterOutDocsWithoutSlugs)
      : []

    featuredWritingNodes = (data || {}).featuredWriting
      ? mapEdgesToNodes(data.featuredWriting).filter(filterOutDocsWithoutSlugs)
      : []

    artNodes = (data || {}).art ? mapEdgesToNodes(data.art).filter(filterOutDocsWithoutSlugs) : []

    featuredArtNodes = (data || {}).featuredArt
      ? mapEdgesToNodes(data.featuredArt).filter(filterOutDocsWithoutSlugs)
      : []

    photoNodes = (data || {}).photos
      ? mapEdgesToNodes(data.photos).filter(filterOutDocsWithoutSlugs)
      : []

    featuredPhotoNodes = (data || {}).featuredPhotos
      ? mapEdgesToNodes(data.featuredPhotos).filter(filterOutDocsWithoutSlugs)
      : []
  }

  const showFeatured =
    !!featuredWritingNodes.length || !!featuredArtNodes.length || !!featuredPhotoNodes.length

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
        <h2 className={typography.responsiveTitle1}>{page.title}</h2>
        <BlockContent blocks={page._rawBody || []} />
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
            <LightboxGrid nodes={artNodes} type='art' />
          </PreviewGrid>
        )}
        {photoNodes && (
          <PreviewGrid title='Recent photos' browseMoreHref='/photos/'>
            <LightboxGrid nodes={photoNodes} type='photo' />
          </PreviewGrid>
        )}
      </Container>
      {showFeatured && (
        <Container color='primary'>
          <Featured
            writingNodes={featuredWritingNodes}
            artNodes={featuredArtNodes}
            photoNodes={featuredPhotoNodes}
          />
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

    page: sanityPage(_id: { regex: "/(drafts.|)home/" }) {
      id
      _id
      title
      _rawBody
    }

    posts: allSanityPost(limit: 3, sort: { fields: [publishedAt], order: DESC }) {
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
          environment
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
          environment
          preview
          classification
          retailUrl
          featured
          _rawExcerpt
          _rawSummary
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

    featuredWriting: allSanityWriting(limit: 3, filter: { featured: { eq: true } }) {
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
          title
          environment
          preview
          classification
          retailUrl
          featured
          _rawExcerpt
          _rawSummary
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

    art: allSanityArt(limit: 3, sort: { fields: [creationDate], order: DESC }) {
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
          title
          environment
          featured
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
          title
          environment
          featured
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

    photos: allSanityPhoto(limit: 3, sort: { fields: [creationDate], order: DESC }) {
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
          title
          environment
          featured
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
          title
          environment
          featured
          _rawDescription
          slug {
            current
          }
        }
      }
    }

    prodPosts: allSanityPost(
      limit: 3
      sort: { fields: [publishedAt], order: DESC }
      filter: { environment: { eq: "production" } }
    ) {
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
          environment
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }

    prodWriting: allSanityWriting(
      limit: 6
      sort: { fields: [releaseDate], order: DESC }
      filter: { environment: { eq: "production" } }
    ) {
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
          title
          environment
          preview
          classification
          retailUrl
          featured
          _rawExcerpt
          _rawSummary
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

    prodFeaturedWriting: allSanityWriting(
      limit: 3
      filter: { featured: { eq: true }, environment: { eq: "production" } }
    ) {
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
          title
          environment
          preview
          classification
          retailUrl
          featured
          _rawExcerpt
          _rawSummary
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

    prodArt: allSanityArt(
      limit: 3
      sort: { fields: [creationDate], order: DESC }
      filter: { environment: { eq: "production" } }
    ) {
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
          title
          environment
          featured
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

    prodFeaturedArt: allSanityArt(
      limit: 3
      filter: { featured: { eq: true }, environment: { eq: "production" } }
    ) {
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
          title
          environment
          featured
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

    prodPhotos: allSanityPhoto(
      limit: 3
      sort: { fields: [creationDate], order: DESC }
      filter: { environment: { eq: "production" } }
    ) {
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
          title
          environment
          featured
          _rawDescription
          slug {
            current
          }
        }
      }
    }

    prodFeaturedPhotos: allSanityPhoto(
      limit: 3
      filter: { featured: { eq: true }, environment: { eq: "production" } }
    ) {
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
          title
          environment
          featured
          _rawDescription
          slug {
            current
          }
        }
      }
    }
  }
`
