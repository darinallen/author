import { Link } from 'gatsby'
import React from 'react'

import styles from './preview-grid.module.css'

function PreviewGrid (props) {
  return (
    <div className={styles.root}>
      {props.title && (
        <h2 className={styles.headline}>
          {props.browseMoreHref ? (
            <Link to={props.browseMoreHref}>{props.title}</Link>
          ) : (
            props.title
          )}
        </h2>
      )}
      <ul className={styles.grid}>{props.children}</ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  )
}

PreviewGrid.defaultProps = {
  title: '',
  browseMoreHref: ''
}

export default PreviewGrid
