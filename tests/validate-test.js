const request = require('supertest');


describe('validate() middleware', () => {
  const server = require('./mock-server');

  describe('query', () => {
    it('returns 400 for failed query validation', (done) => {
      request(server)
        .get('/posts')
        .expect(400, done)
    });
    
    it('returns 200 for successful query validation', (done) => {
      request(server)
        .get('/posts?limit=10')
        .expect(200, 'ok', done)
    });
  });
  
  describe('params validation', () => {
    it('returns 400 for failed params validation', (done) => {
      request(server)
        .get('/contacts/tina')
        .expect(400, done)
    });
    
    it('returns 200 for successful params validation', (done) => {
      request(server)
        .get('/contacts/7')
        .expect(200, 'ok', done)
    });
  });
  
  describe('body validation', () => {
    it('returns 400 for failed body validation', (done) => {
      request(server)
        .post('/contacts')
        .send({ firstName: 'Tina' })
        .expect(400, done)
    });
    
    it('returns 200 for successful body validation', (done) => {
      request(server)
        .post('/contacts')
        .send({ firstName: 'Tina', email: 'info@tinaciousdesign.com' })
        .expect(200, 'ok', done)
    });
  });
});