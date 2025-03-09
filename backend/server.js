const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 8081;

const userRouter = require('./routes/UserRoute');

app.use(express.json());

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
