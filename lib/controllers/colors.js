const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/api/v1/colors', async (req, res) => {
    try {
      const color = await Color.insert(req, res);
      res.send(color);
    } catch(err) {
      res.status(500).send(err);
    }
  });
