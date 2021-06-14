const pool = require('../utils/pool');

class Color {
  id;
  color;

  constructor(row) {
    this.id = row.id;
    this.color = row.color;
  }

  static async insert({ color }) {
    const { rows } = await pool.query(
      'INSERT INTO colors (color) VALUES ($1) RETURNING *',
      [color]
    );

    return new Color(rows[0]);
  }
}

module.exports = Color;
