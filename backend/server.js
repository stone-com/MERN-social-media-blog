const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 5500;

connectDB();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

app.listen(port, () => {
  console.log(`Server listening on: ${port}`);
});
