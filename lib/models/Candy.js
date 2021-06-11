const pool = require('../utils/pool');

class Candy {
  id;
  name;
  texture;
  size;

  constructor(row) {
    this.id = row.id;
    this.name = row.label;
    this.texture = row.texture;
    this.size = row.size;
  }

  static async insert(name, texture, size) {
    const { rows } = await pool.query(
      'INSERT INTO candies (label, texture, size) VALUES ($1, $2, $3) RETURNING *',
      [name, texture, size]
    );

    return new Candy(rows[0]);
  }
}

module.exports = Candy;
