import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './utils/passport.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve the client app from the correct location
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Handle all routes by serving `index.html` for single-page applications
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export { app };
