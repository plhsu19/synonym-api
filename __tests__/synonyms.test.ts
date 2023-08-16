import request from 'supertest';
import app from '../src/app.js';

// TODO: debug the error on ES module syntax
describe('/synonyms endpoints', () => {
  // POST request happy path
  it('should create a new synonym and return it', async () => {
    const postSynonymRequestBody = {
      word: 'start',
      synonym: 'begin',
    };
    const postResponse = await request(app)
      .post('/synonyms')
      .send(postSynonymRequestBody);
    expect(postResponse.status).toBe(201);
    expect(postResponse.body.word).toBe(postSynonymRequestBody.word);
    expect(postResponse.body.synonym).toBe(postSynonymRequestBody.synonym);
  });

  // POST + GET request happy path
  it('should create a new synonym and fetch the synonym by word', async () => {
    const postSynonymRequestBody = {
      word: 'start',
      synonym: 'begin',
    };
    const word = 'begin';

    await request(app).post('/synonyms').send(postSynonymRequestBody);
    const getResponse = await request(app).get(`/synonyms/${word}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.word).toBe(word);
    expect(getResponse.body.number).toBe(1);
    expect(getResponse.body.synonyms[0]).toBe(postSynonymRequestBody.word);
  });
});
