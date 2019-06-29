import { Link } from 'gatsby'
import React from 'react'
import Icon from '../icons'
import { cn } from '../../lib/helpers'

import styles from './nav.module.css'

const Nav = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.root}>
    <div className={styles.wrapper}>
      <h1 className={styles.branding}>
        <Link to='/'>{siteTitle}</Link>
      </h1>

      <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
        <Icon symbol='hamburger' />
      </button>

      <nav className={cn(styles.nav, showNav && styles.showNav)}>
        <ul>
          <li>
            <Link to='/writing/'>Writing</Link>
          </li>
          <li>
            <Link to='/art/'>Art</Link>
          </li>
          <li>
            <Link to='/photos/'>Photos</Link>
          </li>
          <li>
            <Link to='/blog/'>Blog</Link>
          </li>
          <li>
            <Link to='/about/'>About</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)

export default Nav
