const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');

dotenv.config();

const serverApp = express();
serverApp.use(express.json());

const cors = require('cors');
serverApp.use(cors({ origin: 'http://localhost:5173' }));

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

serverApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

serverApp.use('/api/user/', userRouter);
serverApp.use('/api/auth/', authRouter); // Specify the auth router

serverApp.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'

return res.status(statusCode).json({
    success:false,
    status:statusCode,
    message:message,
})

})