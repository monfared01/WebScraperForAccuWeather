const cheerio = require('cheerio')

let history = $ => {
  return new Promise((resolve, reject) => {
    try {
      let _history = $('div[class=history]').children()
      let history = {
        'temperature-history': cheerio
          .load(_history[0])('span')
          .text(),
        details: []
      }
      for (let index = 2; index < 5; index++) {
        history.details.push({
          key: cheerio
            .load(_history[index])('div .label')
            .text()
            .trim(),
          high: cheerio
            .load(
              cheerio
                .load(_history[index])('div .temperature')
                .toArray()[0]
            )
            .text(),
          low: cheerio
            .load(
              cheerio
                .load(_history[index])('div .temperature')
                .toArray()[0]
            )
            .text()
        })
      }
      resolve({ history })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  history
}
