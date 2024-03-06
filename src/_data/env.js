const isDev = process.env.ELEVENTY_ENV === 'dev'

module.exports = {
  baseUrl: isDev
    ? '/'
    : '/11ty-landing-page/'
}