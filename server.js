const http = require('http');
const express = require('express');
const dotenv = require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const todoRouter = require('./routes/todoRoute');

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use('/api/v1/todo', todoRouter);

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((err) => {
    console.log('DB connection failed!!!', err);
  });

server.listen(port, () => {
  console.log(`Server is runnning on ${port}`);
});
