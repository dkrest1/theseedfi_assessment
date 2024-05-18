class TransactionModel {
    constructor(id, amount, description) {
      this.id = id;
      this.amount = amount;
      this.description = description;
    }
  
    static async create(pool, amount, description) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
  
        const query = 'INSERT INTO transactions (amount, description) VALUES ($1, $2) RETURNING *';
        const values = [amount, description];
        const res = await client.query(query, values);
  
        await client.query('COMMIT');
        return new TransactionModel(res.rows[0].id, res.rows[0].amount, res.rows[0].description);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }
  
    static async getAll(pool) {
      const client = await pool.connect();
      try {
        const query = 'SELECT * FROM transactions';
        const res = await client.query(query);
        return res.rows.map((row) => new TransactionModel(row.id, row.amount, row.description));
      } catch (error) {
        throw error;
      } finally {
        client.release();
      }
    }
}

module.exports = TransactionModel;