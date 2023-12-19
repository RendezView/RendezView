const {Pool} = require('pg');

// Create a new pool instance
const pool = new Pool({
  user: 'your_username',
  password: 'your_password',
  host: 'your_host',
  port: 'your_port',
  database: 'your_database',
});

// Middleware to create an event
const createEvent = async (req, res, next) => {
  try {
    const {name, description, date} = req.body;

    // Generate a unique URL part
    const uniqueUrl = crypto.randomBytes(16).toString('hex');

    const query =
      'INSERT INTO events (name, description, date, unique_url) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, description, date, uniqueUrl];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    error.log = 'Error in createEvent middleware';
    next(error);
  }
};

// Middleware to update an event by unique URL
const updateEvent = async (req, res, next) => {
  try {
    const {name, description, date} = req.body;
    const uniqueUrl = req.params.uniqueUrl;
    const query =
      'UPDATE events SET name = $1, description = $2, date = $3 WHERE unique_url = $4 RETURNING *';
    const values = [name, description, date, uniqueUrl];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({message: 'Event not found'});
    }

    res.json(result.rows[0]);
  } catch (error) {
    error.log = 'Error in updateEvent middleware';
    next(error);
  }
};

// Middleware to delete an event by unique URL
const deleteEvent = async (req, res, next) => {
  try {
    const uniqueUrl = req.params.uniqueUrl;
    const query = 'DELETE FROM events WHERE unique_url = $1';
    const result = await pool.query(query, [uniqueUrl]);

    if (result.rowCount === 0) {
      return res.status(404).json({message: 'Event not found'});
    }

    res.sendStatus(204);
  } catch (error) {
    error.log = 'Error in deleteEvent middleware';
    next(error);
  }
};

// Middleware to get an event by unique URL
const getEvent = async (req, res, next) => {
  try {
    const uniqueUrl = req.params.uniqueUrl;
    const query = 'SELECT * FROM events WHERE unique_url = $1';
    const values = [uniqueUrl];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({message: 'Event not found'});
    }

    res.json(result.rows[0]);
  } catch (error) {
    error.log = 'Error in getEventByUniqueUrl middleware';
    next(error);
  }
};

// Export the middleware functions
module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
};
