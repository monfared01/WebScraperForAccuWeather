const cheerio = require('cheerio')

let main = $ => {
  return new Promise((resolve, reject) => {
    try {
      let _ = cheerio.load($('div[class=half-day-card-header]').html())
      let data = {
        title: _('h2[class=title]').text(),
        'real-feel': _('div[class=real-feel]')
          .text()
          .trim()
          .replace('\n', '')
          .replace('\t\t\t\t', ''),
        'short-date': _('div[class=short-date]')
          .text()
          .trim(),
        'hi-lo-label': _('span[class=hi-lo-label]').text(),
        temperature: cheerio
          .load(_('div[class=temperature]').html())
          .text()
          .trim(),
        phrase: $('div .phrase').text(),
        details: []
      }
      for (const obj of $('div[class=left]').children()) {
        let _c = cheerio.load(obj)
        data.details.push({
          key: _c('p[class=panel-item]')
            .text()
            .trim()
            .replace(
              _c('span[class=value]')
                .text()
                .trim(),
              ''
            ),
          value: _c('span[class=value]')
            .text()
            .trim()
        })
      }
      for (const obj of $('div[class=right]').children()) {
        let _c = cheerio.load(obj)
        data.details.push({
          key: _c('p[class=panel-item]')
            .text()
            .trim()
            .replace(
              _c('span[class=value]')
                .text()
                .trim(),
              ''
            ),
          value: _c('span[class=value]')
            .text()
            .trim()
        })
      }
      resolve(data)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  main
}
