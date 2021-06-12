require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Candy = require('../lib/models/Candy');
const Bicycle = require('../lib/models/Bicycle');

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
  beforeAll(() => {
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

  it('updates a specific candy', async () => {
    const laffyTaffy = await Candy.findById(2);

    laffyTaffy.size = 'medium';

    const res = await request(app)
      .put(`/api/v1/candies/${laffyTaffy.id}`)
      .send(laffyTaffy);

    expect(res.body).toEqual(laffyTaffy);
  });

  it('delete a specific candy', async () => {
    const bigHunk = await Candy.findById(1);

    const res = await request(app)
      .delete(`/api/v1/candies/${bigHunk.id}`);

    expect(res.body).toEqual(bigHunk);
  });

  it('lists all candy', async () => {
    const lifesaver = await Candy.insert({
      name: 'lifesavers',
      texture: 'hard',
      size: 'small'
    });

    const gummyBears = await Candy.insert({
      name: 'gummy bears',
      texture: 'gummy',
      size: 'tiny'
    });

    const pixieStix = await Candy.insert({
      name: 'pixie stix',
      texture: 'powder',
      size: 'small'
    });

    const laffyTaffy = await Candy.findById(2);

    const res = await request(app).get('/api/v1/candies');

    expect(res.body).toEqual([laffyTaffy, lifesaver, gummyBears, pixieStix]);
  });

});

describe('Bicycle routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  it('creates a new bicycle in our database', async () => {
    const expectation = {
      id: '1',
      brand: 'cannondale',
      type: 'road',
      material: 'aluminum'
    };

    const res = await request(app)
      .post('/api/v1/bicycles')
      .send({ brand: 'cannondale', type: 'road', material: 'aluminum' });
    
    expect(res.body).toEqual(expectation);
  });

  it('gets all bicycles from our database', async () => {
    const waterford = await Bicycle.insert({
      brand: 'waterford',
      type: 'road',
      material: 'steel'
    });

    const fuji = await Bicycle.insert({
      brand: 'fuji',
      type: 'road',
      material: 'aluminum'
    });

    const cannondale = await Bicycle.findById(1);

    const res = await request(app).get('/api/v1/bicycles');

    expect(res.body).toEqual([cannondale, waterford, fuji]);
  });

  it('finds a specific bicycle from our database', async () => {
    const bicycle = await Bicycle.insert({
      brand: 'kona',
      type: 'road',
      material: 'steel'
    });

    const res = await request(app)
      .get(`/api/v1/bicycles/${bicycle.id}`);

    expect(res.body).toEqual(bicycle);
  });

});
