const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db');
const dotenv = require('dotenv');
const postRouter = require('./routes/blogRoute');

app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

// app.get('/posts', (req, res) => {
//   res.send(postData);
// });

app.use('/posts', postRouter);

const POST = process.env.POST || 9000;

app.listen(POST, () => console.log(`server listening at ${POST}`));
