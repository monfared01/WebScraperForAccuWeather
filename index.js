const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const { url } = require('./config.json')
let { _fuc } = require('./tools/main')

let _status = []
let _date = []
const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

axios
  .get(url)
  .then(async function (response) {
    const $ = cheerio.load(response.data)
    let _array = $('div .monthly-dropdowns').children()
    for (let o of _array) {
      var _ = cheerio.load(o)
      _date.push(_('h2').text())
    }
    let start = false
    let array = $('div[class=monthly-calendar]').children()
    for (let index = 0; index < array.length; index++) {
      var _ = cheerio.load(array[index])
      let day = _('div .date').text().trim()
      if (start && day == 1) {
        break
      } else if ((!start && day == 1) || start) {
        start = true
        _status.push({
          class:
            _('a')
              .attr('class')
              .replace('monthly-daypanel', '')
              .trim() || 'is-feature',
          weather: _('img').attr('alt') || '',
          dayname: dayNames[index % 7],
          day,
          history: _('div .history').text() || '',
          high: _('div .high').text().trim(),
          low: _('div .low').text().trim() ,
          details : !_('a').attr('href') ? {} : await _fuc(new URL(url).origin + _('a').attr('href'))
        })
      }
    }
  })
  .catch(function (error) {
    console.log(error)
  })
  .then(() => {
    fs.writeFileSync(
      `./json/${_date.toString().replace(',', '-')}.json`,
      JSON.stringify({
        month: _date[0] || '',
        year: _date[1] || '',
        status: _status
      })
    )
  })
