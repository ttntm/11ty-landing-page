import autoprefixer from 'autoprefixer'
import cssnanoPlugin from 'cssnano'
import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import postcssImport from 'postcss-import'
import tailwind from 'tailwindcss'
import tailwindConfig from '../../tailwind.config.cjs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default class {
  async data() {
    const cssDir = path.join(__dirname, '..', '_includes', 'css')
    const rawFilepath = path.join(cssDir, '_page.css')

    return {
      permalink: `css/page.css`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath),
      excludeFromSitemap: true
    }
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      postcssImport,
      cssnanoPlugin,
      tailwind(tailwindConfig),
      autoprefixer
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css)
  }
}