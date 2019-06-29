const { format } = require('date-fns')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createWritingDetailsPages (graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityWriting(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const writingEdges = (result.data.allSanityWriting || {}).edges || []

  writingEdges.forEach((edge, index) => {
    const { id, slug = {} } = edge.node
    const path = `/writing/${slug.current}/`

    reporter.info(`Creating writing details page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/writing-details.js'),
      context: { id }
    })

    createPageDependency({ path, nodeId: id })
  })
}

async function createArtDetailsPages (graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityArt(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const artEdges = (result.data.allSanityArt || {}).edges || []

  artEdges.forEach((edge, index) => {
    const { id, slug = {} } = edge.node
    const path = `/art/${slug.current}/`

    reporter.info(`Creating art details page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/art-details.js'),
      context: { id }
    })

    createPageDependency({ path, nodeId: id })
  })
}

async function createPhotoDetailsPages (graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityPhoto(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const photoEdges = (result.data.allSanityPhoto || {}).edges || []

  photoEdges.forEach((edge, index) => {
    const { id, slug = {} } = edge.node
    const path = `/photos/${slug.current}/`

    reporter.info(`Creating photo details page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/photo-details.js'),
      context: { id }
    })

    createPageDependency({ path, nodeId: id })
  })
}

async function createBlogPostPages (graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges.forEach((edge, index) => {
    const { id, slug = {}, publishedAt } = edge.node
    const dateSegment = format(publishedAt, 'YYYY/MM')
    const path = `/blog/${dateSegment}/${slug.current}/`

    reporter.info(`Creating blog post page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/blog-post.js'),
      context: { id }
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createWritingDetailsPages(graphql, actions, reporter)
  console.log('Created writing details pages')
  await createArtDetailsPages(graphql, actions, reporter)
  console.log('Created art details pages')
  await createPhotoDetailsPages(graphql, actions, reporter)
  console.log('Created photo details pages')
  await createBlogPostPages(graphql, actions, reporter)
  console.log('Created blog post pages')
}
