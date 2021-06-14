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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM colors WHERE id = $1', [id]
    );

    if(!rows[0]) return null;

    return new Color(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM colors'
    );

    return rows.map(row => new Color(row));
  }
}

module.exports = Color;
