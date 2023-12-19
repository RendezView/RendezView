const express = require('express');
const path = require('path');
// const cors = require('cors');

const app = express();

app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// global error handler // does the router
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
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
