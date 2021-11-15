const axios = require('axios')
const cheerio = require('cheerio')

const { main } = require('./cards/main')
const { history } = require('./cards/history')
const { status } = require('./cards/status')
const { other } = require('./other')

let _fuc = url => {
  let data = {
    time: []
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(async function (response) {
        const $ = cheerio.load(response.data)
        let mainCards = $('div .content-module').children()
        let Day = cheerio.load(mainCards[1])
        let Night = cheerio.load(mainCards[2])
        data.time.push(await main(Day))
        data.time.push(await main(Night))
        try {
          data.time.push(
            await other(
              new URL(url).origin +
                cheerio
                  .load(Day('a[class=quarter-day-cta]').toArray()[0])('a')
                  .attr('href')
                  .toString()
            )
          )
          data.time.push(
            await other(
              new URL(url).origin +
                cheerio
                  .load(Day('a[class=quarter-day-cta]').toArray()[0])('a')
                  .attr('href')
                  .toString()
            )
          )
          data.time.push(
            await other(
              new URL(url).origin +
                cheerio
                  .load(Night('a[class=quarter-day-cta]').toArray()[0])('a')
                  .attr('href')
                  .toString()
            )
          )
          data.time.push(
            await other(
              new URL(url).origin +
                cheerio
                  .load(Night('a[class=quarter-day-cta]').toArray()[0])('a')
                  .attr('href')
                  .toString()
            )
          )
        } catch (e) {}

        Object.assign(data, await history($), await status($))
      })
      .catch(function (e) {
        reject(e)
      })
      .then(() => {
        resolve(data)
      })
  })
}
module.exports = {
  _fuc
}
