import S from '@sanity/desk-tool/structure-builder'
import MdBusiness from 'react-icons/lib/md/business'
import MdSettings from 'react-icons/lib/md/settings'
import MdBook from 'react-icons/lib/md/book'
import MdBrush from 'react-icons/lib/md/brush'
import FaFileO from 'react-icons/lib/fa/file-o'

const hiddenTypes = ['category', 'page', 'person', 'post', 'siteSettings', 'writing', 'art']

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Writing')
        .schemaType('writing')
        .child(S.documentTypeList('writing').title('Writing'))
        .icon(MdBook),
      S.listItem()
        .title('Art')
        .schemaType('art')
        .child(S.documentTypeList('art').title('Art'))
        .icon(MdBrush),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About')
                .child(
                  S.editor()
                    .id('aboutPage')
                    .schemaType('page')
                    .documentId('about')
                )
                .icon(FaFileO)
            ])
        ),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId()))
    ])
