export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  liveEdit: false,
  __experimental_actions: ['update', 'publish' /* 'create', 'delete' */],
  fields: [
    {
      name: 'environment',
      title: 'Environment',
      type: 'string',
      options: {
        list: [
          { title: 'Production', value: 'production' },
          { title: 'Staging', value: 'staging' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ]
}
