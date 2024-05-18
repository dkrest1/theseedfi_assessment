const fs = require("fs");
const path = require("path");
const pool = require("./db.config");

const migrationsDir = path.join(__dirname, '../migrations');

async function runMigrations() {
  const client = await pool.connect();
  try {
    // read existing migration versions (if the table exists)
    const appliedMigrations = await readAppliedMigrations(client);

    // iterate through migration files, applying only unapplied ones
    const files = fs.readdirSync(migrationsDir);
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);

      // extract migration name from filename
      const migrationName = file.split('.')[0]; 

      if (!appliedMigrations.includes(migrationName)) {
        const sql = fs.readFileSync(filePath, 'utf8');
        console.log(`Running migration: ${file}`);
        await client.query(sql);
        console.log(`Migration ${file} applied successfully`);

        // track applied migration
        await insertAppliedMigration(client, migrationName);
      } else {
        console.log(`Migration ${file} already applied, skipping...`);
      }
    }
  } catch (err) {
    console.error(`Error applying migrations:`, err);
  } finally {
    await client.end();
  }
}

/**
 * Helper Functions
 */

async function readAppliedMigrations(client) {
  try {
    // check if migrations table exists
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations'
      );
    `);

    if (tableExists.rows[0].exists) {
      // if table exists, query for applied migrations
      const result = await client.query('SELECT name FROM migrations');
      return result.rows.map(row => row.name);
    } else {
      console.log('Migrations table does not exist, creating migrations table...');
      return []; 
    }
  } catch (error) {
    console.error('Error checking or reading applied migrations:', error);

    // return an empty array in case of errors
    return []; 
  }
}

async function insertAppliedMigration(client, migrationName) {
  await client.query('INSERT INTO migrations (name, applied_at) VALUES ($1, $2)', [migrationName, new Date()]);
}

module.exports = runMigrations;