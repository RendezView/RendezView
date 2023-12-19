const express = require('express');
const path = require('path');
// const cors = require('cors');

const app = express();

// Import the controller functions
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  validateUniqueUrl,
} = require('./controller');

app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'build')));

// if there is a custom url, serve the event page
app.get('/event/:uniqueUrl', validateUniqueUrl, async (req, res, next) => {
  try {
    await getEvent(req, res, () => {
      if (req.event) {
        // Send a response that includes event data and a flag for the frontend
        res.json({
          customEvent: true,
          eventData: req.event
        });
      } else {
        // If no event data is attached, send a 404
        // OR maybe redirect to main page with an alert?
        res.status(404).send('Event not found');
      }
    });
  } catch (error) {
    next(error);
  }
});

// Event routes
app.post('/events', createEvent);
app.put('/events/:uniqueUrl', validateUniqueUrl, updateEvent);
app.delete('/events/:uniqueUrl', validateUniqueUrl, deleteEvent);

// serves main site content for the root, defaults to creating event page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: 'An error occurred'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
