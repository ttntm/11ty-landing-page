const isPages = process.env.ELEVENTY_ENV === 'pages'

module.exports = {
  baseUrl: isPages
    ? '/11ty-landing-page/'
    : '/'
}