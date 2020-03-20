const supertest = require('supertest');
const { app, mongoose } = require('../../server');
const request = supertest(app);

describe('Routes for working with Google map', () => {
  it('get options by value', async () => {
    const response = await request.get(
      '/api/gmap/options/Nadvi'
    );
    expect(response.status).toBe(200);
    expect(response.body.predictions.length >= 0).toBe(true);
  });
  it('get details by placeid', async () => {
    const response = await request.get(
      '/api/gmap/details/ChIJTT1BkYgyN0cR6N8ejb0d72U'
    );
    expect(response.status).toBe(200);
  });
  it('get place by reverseGeocoding', async () => {
    const response = await request.get(
      '/api/gmap/reversegeocode/24.023567563621526/49.838111164857'
    );
    expect(response.body.results.length >= 0).toBe(true);
    expect(response.status).toBe(200);
  });
});
