const cheerio = require('cheerio')

let status = $ => {
  return new Promise((resolve, reject) => {
    try {
      const _ = cheerio.load($('div .sunrise-sunset').html())
      const moon = _('div .right').children()
      const sun = _('div .left').children()
      let status = {
        moon: {
          duration: cheerio
            .load(moon[0])('div[class=duration]')
            .text()
            .trim()
            .replace('\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t', ' - '),
          rise: cheerio
            .load(moon[1])('span[class=text-value]')
            .text()
            .trim(),
          set: cheerio
            .load(moon[2])('span[class=text-value]')
            .text()
            .trim()
        },
        sun: {
          duration: cheerio
            .load(sun[0])('div[class=duration]')
            .text()
            .trim()
            .replace('\n\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t', ' - '),
          rise: cheerio
            .load(sun[1])('span[class=text-value]')
            .text()
            .trim(),
          set: cheerio
            .load(sun[2])('span[class=text-value]')
            .text()
            .trim()
        }
      }
      resolve({ status })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
    status
}
