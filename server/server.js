const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require('./config/db');
const dotenv = require('dotenv');
const postRouter = require('./routes/blogRoute');
const userRouter = require('./routes/userRoute');

app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

// app.get('/posts', (req, res) => {
//   res.send(postData);
// });

app.use('/posts', postRouter);
app.use('/users', userRouter);

const POST = process.env.POST || 9000;

app.listen(POST, () => console.log(`server listening at ${POST}`));
