require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Candy = require('../lib/models/Candy');

describe('03_separation-of-concerns routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database', async () => {
    const expectation = {
      id: '1',
      quantityOfItems: 10,
    };

    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual(expectation);
  });
});

describe('Candy routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new candy in our database', async () => {
    const expectation = {
      id: '1',
      name: 'Big Hunk',
      texture: 'chewy',
      size: 'large'
    };

    const res = await request(app)
      .post('/api/v1/candies')
      .send({ name: 'Big Hunk', texture: 'chewy', size: 'large' });

    expect(res.body).toEqual(expectation);
  });

  it('retrieves a specific candy from our database', async () => {
    const candy = await Candy.insert({
      name: 'Laffy Taffy',
      texture: 'chewy',
      size: 'small'
    });

    const res = await request(app)
      .get(`/api/v1/candies/${candy.id}`);

    expect(res.body).toEqual(candy);
  });

});
