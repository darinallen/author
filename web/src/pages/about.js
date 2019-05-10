import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import PeopleGrid from '../components/people-grid'
import SEO from '../components/seo'
import Hero from '../components/shared/hero/hero'
import family from '../components/shared/hero/family.png'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle2 } from '../components/typography.module.css'
import styles from './about.module.css'

const AboutPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const page = data && data.page
  const personNodes =
    data && data.people && mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs)

  if (!page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Hero
        image={family}
        titleTop='About '
        titleBottom='Me'
        subtitle='Bio & Contact Information'
        bottomAlign
        leftAlign
      />
      <Container>
        <h2 className={responsiveTitle2}>{page.title}</h2>
        <main className={styles.content}>
          <BlockContent blocks={page._rawBody || []} />
          {personNodes && personNodes.length > 0 && (
            <PeopleGrid items={personNodes} title='People' />
          )}
        </main>
      </Container>
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query AboutPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)about/" }) {
      id
      _id
      title
      _rawBody
    }
    people: allSanityPerson {
      edges {
        node {
          id
          image {
            asset {
              _id
            }
          }
          name
          _rawBio
        }
      }
    }
  }
`
