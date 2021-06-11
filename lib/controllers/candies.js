const { Router } = require('express');
const Candy = require('../models/Candy');

module.exports = Router()
  .post('/api/v1/candies', async (req, res) => {
    try {
      const candy = await Candy.insert(req.body.name, req.body.texture, req.body.size);
      res.send(candy);
    } catch(err) {
      res.status(500).send(err);
    }
  })

  .get('/api/v1/candies/:id', async (req, res) => {
    try {
      const candy = await Candy.findById(req.params.id);
      res.send(candy);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
