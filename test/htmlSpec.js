const app = require('../app')
const supertest = require('supertest')
const cheerio = require('cheerio')

describe('html response', function() {
  let request = null
  beforeEach(function() {
    request = supertest(app)
    .get('/')
    .set('User-Agent', 'my browser')
    .set('Accept', 'text/html')
  })

  it('returns a html response', function(done) {
    request.expect('Content-Type', /html/)
    .expect(200)
    .end(done)
  })

  it('returns your User Agent', function(done) {
    request.expect(function (res) {
      let htmlResponse = res.text
      let $ = cheerio.load(htmlResponse)
      let userAgent = $('.user-agent').html().trim()
      if (userAgent !== 'my browser') {
        throw new Error('User agent not found')
      }
    }).end(done)
  })
})
