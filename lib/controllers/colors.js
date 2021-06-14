const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/api/v1/colors', async (req, res) => {
    try {
      const color = await Color.insert(req.body);
      res.send(color);
    } catch(err) {
      res.status(500).send(err);
    }
  })
  
  .get('/api/v1/colors/:id', async (req, res) => {
    try {
      const color = await Color.findById(req.params.id);
      res.send(color);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
