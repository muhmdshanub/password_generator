const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passwordRouter = require('./routes/passwordRouter');
const { errorHandler, notFound } = require('./middlewares/errorHandlerMiddleware');
const app = express();

// Middleware
const corsOptions = {
    origin:process.env.FRONT_END_URL,
    credentials: true, // Allow credentials (cookies) to be sent
};
app.use(cors(corsOptions));
app.use(express.json());app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/api/password', passwordRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
