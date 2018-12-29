import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from './profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(1.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Junghyuk Yoo`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          한국에서 웹 개발을 하고있는 유정혁입니다. <br />
          자바스크립트와 피자🍕를 좋아합니다.
        </p>
      </div>
    );
  }
}

export default Bio;
