const isPages = process.env.ELEVENTY_ENV === 'pages'

export default {
  baseUrl: isPages
    ? '/11ty-landing-page/'
    : '/'
}
