const pool = require('../utils/pool');

class Bicycle {
  id;
  brand;
  type;
  material;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.type = row.use_case;
    this.material = row.material;
  }

  static async insert({ brand, type, material }) {
    const { rows } = await pool.query(
      'INSERT INTO bicycles (brand, use_case, material) VALUES ($1, $2, $3) RETURNING *',
      [brand, type, material]
    );

    return new Bicycle(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM bicycles'
    );

    return rows.map(row => new Bicycle(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM bicycles WHERE id = $1', [id]
    );

    if(!rows[0]) return null;

    return new Bicycle(rows[0]);
  }

  static async update({ id, brand, type, material }) {
    const { rows } = await pool.query(
      'UPDATE bicycles SET brand = $1, use_case = $2, material = $3 WHERE id = $4 RETURNING *;',
      [brand, type, material, id]
    );

    return new Bicycle(rows[0]);
  }
}

module.exports = Bicycle;
