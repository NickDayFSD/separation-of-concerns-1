const pool = require('../utils/pool');

class Anime {
  id;
  title;
  episodes;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.episodes = row.episodes;
  }

  static async insert({ title, episodes }) {
    const { rows } = await pool.query(
      'INSERT INTO anime (title, episodes) VALUES ($1, $2) RETURNING *',
      [title, episodes]
    );

    return new Anime(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM anime WHERE id = $1', [id]
    );

    if(!rows[0]) return null;

    return new Anime(rows[0]);
  }
}

module.exports = Anime;
