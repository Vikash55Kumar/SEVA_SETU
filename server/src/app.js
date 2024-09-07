import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './utils/passport.js';
import MongoStore from 'connect-mongo';

const app = express();

// CORS Setup
app.use(cors({
  origin: process.env.CORES_ORIGIN,
  methods: 'DELETE, POST, GET, PUT',
  credentials: true,
}));

// Body parsers and other middleware
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser());
app.use(bodyParser.json());

// Setup Google session
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// Initialize Google passport
app.use(passport.initialize());
app.use(passport.session());

// Routers import
import userRouter from './routes/user.route.js';
app.use('/api/v1/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export { app };
