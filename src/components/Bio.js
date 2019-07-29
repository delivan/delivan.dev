import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <img
          src={profilePic}
          alt={`Jeonghyeok Yoo`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          한국에서 개발자로 살고 있는 유정혁(delivan)입니다. <br />
          웹🕸과 책📚과 피자🍕를 좋아라 합니다.
        </p>
      </div>
    )
  }
}

export default Bio
