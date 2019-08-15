import React from 'react'

import './index.scss'

export const PostTitle = ({ title, date }) => (
  <div className="post-top">
    <h1>{title}</h1>
    <p>{date}</p>
  </div>
)
