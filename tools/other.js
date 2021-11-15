const axios = require('axios')
const cheerio = require('cheerio')

const { main } = require('./cards/main')

let other = async url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(async function (response) {
        resolve(await main(cheerio.load(response.data)))
      })
      .catch(function (e) {
        reject(e)
      })
  })
}
module.exports = {
  other
}
