import htmlmin from 'html-minifier'
import markdownIt from 'markdown-it'
import { EleventyHtmlBasePlugin } from '@11ty/eleventy'

const isPages = process.env.ELEVENTY_ENV === 'pages'
const isProdDeployment = Boolean(
  process.env.ELEVENTY_RUN_MODE
  && process.env.ELEVENTY_RUN_MODE === 'build'
)
const outDir = isPages ? 'docs' : 'public'

export default async function(config) {
  config.addPlugin(EleventyHtmlBasePlugin)

  // shortcode to render markdown from string => {{ STRING | markdown | safe }}
  config.addFilter('markdown', function(value) {
    let markdown = markdownIt({
      html: true
    })
    return markdown.render(value)
  })

  // rebuild on CSS changes
  config.addWatchTarget('./src/_includes/css/')

  // Markdown
  config.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    })
  )

  //create collections
  config.addCollection('sections', async (collection) => {
    return collection.getFilteredByGlob('./src/sections/*.md')
  })

  // STATIC FILES
  config.addPassthroughCopy({ './src/static/': '/' })

  // TRANSFORM -- Minify HTML Output
  if (isProdDeployment) {
    config.addTransform('htmlmin', function(content, outputPath) {
      if ( outputPath && outputPath.endsWith('.html') ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        })
        return minified
      }
      return content
    })
  }

  return {
    dir: {
      input: 'src',
      output: outDir,
      data: './_data',
      includes: './_includes',
      layouts: './_layouts'
    },
    templateFormats: [
      'md',
      'njk',
      '11ty.js'
    ],
    htmlTemplateEngine: 'njk'
  }
}
