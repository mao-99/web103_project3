import pool from "./database.js";
import eventData from "../data/events.js";
import locationData from "../data/locations.js";import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env') })


const createTables = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        location VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Events and Locations tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

const seedTables = async () => {
  await createTables();

  // Insert events into the events table
  for (const event of eventData) {
    const insertQuery = {
      text: 'INSERT INTO events (title, date, location) VALUES ($1, $2, $3)',
      values: [event.title, event.date, event.location]
    };
    try {
      await pool.query(insertQuery);
      console.log(`${event.title} added successfully!`);
    } catch (err) {
      console.error('Error inserting event!', err);
    }
  }

  // Insert locations into the locations table
  for (const location of locationData) {
    const insertQuery = {
      text: 'INSERT INTO locations (location) VALUES ($1)',
      values: [location.location]
    };
    try {
      await pool.query(insertQuery);
      console.log(`${location.location} added successfully!`);
    } catch (err) {
      console.error('Error inserting location!', err);
    }
  }
};

async function main() {
  try {
    await pool.connect();
    console.log('Database connection successful');
    await seedTables();
    console.log('All events and locations added successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
    console.log('Database connection closed');
  }
}

main()
  .then(() => {
    console.log('Script completed');
    process.exit(0); // Exit successfully
  })
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1); // Exit with error code
  });
