import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

delete Wordpress2016.googleFonts
Wordpress2016.headerFontFamily = ['NanumSquare', 'Merriweather', 'sans-serif']
Wordpress2016.bodyFontFamily = ['NanumSquare', 'Merriweather', 'sans-serif']
Wordpress2016.baseLineHeight = 1.9
Wordpress2016.baseFontSize = "16px"



const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
