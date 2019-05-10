import React from 'react'
import Nav from './shared/nav'

import '../styles/layout.css'
import styles from './layout.module.css'

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <Nav siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className={styles.site}>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <div className={styles.siteInfo}>
          Powered by{' '}
          <a href='https://www.darinallen.io' target='_blank'>
            Acousticode LLC
          </a>
          , © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  </>
)

export default Layout
