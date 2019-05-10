import { format } from 'date-fns'

export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes (data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsWithoutSlugs ({ slug }) {
  return (slug || {}).current
}

export function getWritingUrl (slug) {
  return `/writing/${slug.current || slug}/`
}

export function getArtUrl (slug) {
  return `/art/${slug.current || slug}/`
}

export function getBlogUrl (publishedAt, slug) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`
}

export function buildImageObj (source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function getFeaturedNodes (writingNodes, artNodes) {
  return {
    writingNodes: writingNodes.filter(node => node.featured),
    artNodes: artNodes.filter(node => node.featured)
  }
}
