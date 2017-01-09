const app = require('../app')
const supertest = require('supertest')

describe('plain text response', function() {
  let request = null
  beforeEach(function () {
    request = supertest(app)
    .get('/')
    .set('User-Agent', 'some browser')
    .set('Accept', 'text/plain')
  })

  it('returns your user agent', function(done) {
    request.expect(function(res) {
      if (res.text !== 'some browser') { 
        throw new Error('Reponse does not contain User Agent.')
      }
    }).end(done)
  })

  it('returns a plain text request', function(done) {
    request.expect('Content-Type', /text\/plain/)
    .expect(200)
    .end(done)
  })
})

