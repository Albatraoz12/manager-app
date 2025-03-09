const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8081;
const app = express();

const userRouter = require('./routes/UserRoute');

app.use(
  cors({
    credentials: true,
    origin: process.env.REQUEST_URL,
  })
);

app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/user', userRouter);

//Simple get req to verify if server is online
app.get('/', (req, res) => {
  res.send('Hello There! - Obi-Wan, aaahhhh general kanobi!');
});

//Start server function
const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server up and running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

//server connection starts here
mongoose.connect(process.env.DATABASE_URL).then(() => {
  startServer(port);
});
