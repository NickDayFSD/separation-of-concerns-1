const { Router, request } = require('express');
const Bicycle = require('../models/Bicycle');

module.exports = Router()
  .post('/api/v1/bicycles', async (req, res) => {
    try {
      const bicycle = await Bicycle.insert(req.body);
      res.send(bicycle);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/bicycles', async (req, res) => {
    try {
      const bicycle = await Bicycle.getAll();
      res.send(bicycle);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/bicycles/:id', async (req, res) => {
    try {
      const bicycle = await Bicycle.findById(req.params.id);
      res.send(bicycle);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
