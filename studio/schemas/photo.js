import MdPhoto from 'react-icons/lib/md/photo'

export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  icon: MdPhoto,
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
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured items will show up in the Featured section of the home page'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the post',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'creationDate',
      title: 'Creation date',
      description: 'You can use this field to set the creation date for the artwork',
      type: 'datetime'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'postAuthor' }]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent'
    }
  ],
  orderings: [
    {
      title: 'Creation date new–>old',
      name: 'creationDateAsc',
      by: [{ field: 'creationDate', direction: 'asc' }, { field: 'title', direction: 'asc' }]
    },
    {
      title: 'Creation date old->new',
      name: 'creationDateDesc',
      by: [{ field: 'creationDate', direction: 'desc' }, { field: 'title', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      creationDate: 'creationDate',
      image: 'mainImage'
    },
    prepare ({ title = 'No title', creationDate, image }) {
      return {
        title,
        subtitle: creationDate
          ? new Date(creationDate).toLocaleDateString()
          : 'Missing creation date',
        media: image
      }
    }
  }
}
