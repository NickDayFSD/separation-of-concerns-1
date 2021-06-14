const { Router, request } = require('express');
const Anime = require('../models/Anime');

module.exports = Router()
  .post('/api/v1/anime', async (req, res) => {
    try {
      const anime = await Anime.insert(req.body);
      res.send(anime);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  .get('/api/v1/anime/:id', async (req, res) => {
    try {
      const anime = await Anime.findById(req.params.id);
      res.send(anime);
    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
