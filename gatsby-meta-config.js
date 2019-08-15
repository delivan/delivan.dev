module.exports = {
  title: `delivan.dev`,
  description: `주로 책과 웹 개발에 관련된 글을 씁니다.`,
  author: `delivan`,
  introduction: `흔한 웹 개발자입니다. 책과 피자를 좋아라 합니다.`,
  siteUrl: `https://delivan.dev`,
  sitemapPath: `https://delivan.dev/sitemap.xml`,
  robotsPolicy: [{ userAgent: '*', allow: '/' }],
  social: {
    twitter: `delivan_yoo`, // Your Twitter account
    github: `delivan`, // Your GitHub account
    medium: ``, // Your Medium account
    facebook: `jeonghyeok.yoo`, // Your Facebook account
  },
  icon: `content/assets/favicon.png`, // Add your favicon
  keywords: [
    `blog`,
    `devlog`,
    `web`,
    `development`,
    `frontend`,
    `backend`,
    `javascript`,
    `books`,
    `review`,
  ],
  comment: {
    disqusShortName: '', // Your disqus-short-name. check disqus.com.
    utterances: 'delivan/delivan.dev', // Your repository for archive comment
  },
  configs: {
    countOfInitialPost: 10, // Config your initial count of post
  },
  sponsor: {
    buyMeACoffeeId: 'delivan',
  },
  share: {
    facebookAppId: '2281943828568674', // Add facebookAppId for using facebook share feature v3.2
  },
  ga: 'UA-111652703-2', // Add your google analytics tranking ID
  sentryDsn: 'https://712652024de44bc7ac174bbf33e9096f@sentry.io/1530733',
}
