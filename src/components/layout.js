import React from 'react'
import { Link } from 'gatsby'

import { ThemeContext, themes } from './theme';
import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  state = {
    theme: themes.light
  }
  
  render() {
    const { location, children, title } = this.props
    const { theme } = this.state
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            fontFamily: 'NanumSquare, Merriweather, sans-serif',
            ...scale(1.3),
            marginBottom: rhythm(1.2),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: theme.fontColor,
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'NanumSquare, Merriweather, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: theme.fontColor,
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <ThemeContext.Provider value={theme}>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            backgroundColor: theme.backgroundColor
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default Layout
