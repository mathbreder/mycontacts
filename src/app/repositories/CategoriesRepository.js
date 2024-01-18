const db = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`select * from categories order by name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT * FROM categories
      WHERE id = $1
    `, [id]);
    return row;
  }

  async create({
    name,
  }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES ($1)
      RETURNING *
    `, [name]);
    return row;
  }

  async update(id, category) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [category.name, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM categories
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new CategoriesRepository();
