import { format, distanceInWords, differenceInDays } from 'date-fns'
import React, { useState } from 'react'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { buildImageObj, cn } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import Hero from './shared/hero/hero'
import BlockContent from './block-content'
import Container from './container'
import ButtonLink from './shared/buttons/button-link'

import styles from './writing-details.module.css'

function WritingDetails (props) {
  const {
    _rawSummary,
    _rawExcerpt,
    categories,
    title,
    mainImage,
    releaseDate,
    classification,
    retailUrl
  } = props

  const [activeTab, setActiveTab] = useState('summary')

  const formattedReleaseDate =
    differenceInDays(new Date(releaseDate), new Date()) > 3
      ? distanceInWords(new Date(releaseDate), new Date())
      : format(new Date(releaseDate), 'MMMM Do, YYYY')

  let heroTitle

  switch (classification) {
    case 'flashFiction':
      heroTitle = 'Flash Fiction '
      break
    case 'shortStory':
      heroTitle = 'Short Story '
      break
    default:
      heroTitle = 'Novel '
  }

  return (
    <div className={styles.root}>
      <Hero
        image={imageUrlFor(buildImageObj(mainImage))
          .width(400)
          .url()}
        titleTop={heroTitle}
        subtitle={title}
        shadow
      />
      <Container>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.details}>
          {releaseDate && (
            <span className={styles.releaseDate}>{`Released: ${formattedReleaseDate}`}</span>
          )}
          {categories && (
            <div className={styles.categories}>
              <span>{'Categories: '}</span>
              <ul className={styles.categoriesList}>
                {categories.map((category, index) => (
                  <li className={styles.category} key={category._id}>
                    {`${category.title}${index < categories.length - 1 ? ', ' : ''}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.doubleDivider} />
        <nav className={styles.nav}>
          {_rawSummary && (
            <a
              className={cn(styles.navItem, activeTab === 'summary' ? styles.activeTab : '')}
              onClick={() => setActiveTab('summary')}
            >
              SUMMARY
            </a>
          )}
          {_rawExcerpt && (
            <a
              className={cn(styles.navItem, activeTab === 'excerpt' ? styles.activeTab : '')}
              onClick={() => setActiveTab('excerpt')}
            >
              EXCERPT
            </a>
          )}
          {retailUrl && (
            <a href={retailUrl} className={styles.navItem} target='_blank'>
              PURCHASE
            </a>
          )}
        </nav>
        <div className={styles.doubleDivider} />

        <div className={styles.content}>
          <ReactCSSTransitionReplace
            transitionName='cross-fade'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {_rawSummary && activeTab === 'summary' ? (
              <SummaryContent summary={_rawSummary} key='summary' />
            ) : (
              <ExcerptContent excerpt={_rawExcerpt} key='excerpt' />
            )}
          </ReactCSSTransitionReplace>

          {retailUrl && (
            <div className={styles.button}>
              <ButtonLink color='primary' url={retailUrl}>
                Buy Now
              </ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default WritingDetails

const SummaryContent = ({ summary }) => (
  <div id='summary'>
    <BlockContent blocks={summary} />
  </div>
)

const ExcerptContent = ({ excerpt }) => (
  <div id='excerpt'>
    <BlockContent blocks={excerpt} />
  </div>
)
