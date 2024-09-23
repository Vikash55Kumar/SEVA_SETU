import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './utils/passport.js';
import { createServer } from 'http';
import { SocketHandler } from './utils/socketHandler.js';  // Import the WebSocket handler
import MongoStore from 'connect-mongo';
const app = express();
// import path from "path";
// import { fileURLToPath } from "url";
const server = createServer(app); // Create a server instance

// Setup WebSocket
SocketHandler(server);

// const __filename=fileURLToPath(import.meta.url)
// const __dirname=path.dirname(__filename)

// CORS Setup
app.use(cors({
  origin: process.env.CORES_ORIGIN || "https://seva-setu.netlify.app",
  methods: 'DELETE, POST, GET, PUT',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], 
  credentials: true,
}));


// Body parsers and other middleware
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONODB_URI,  // Provide the mongoUrl here
    ttl: 14 * 24 * 60 * 60,  // Sessions expire after 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 14,  // 14 days
  },
}));

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Initialize Google passport
app.use(passport.initialize());
app.use(passport.session());

// Routers import
import userRouter from './routes/user.route.js';
app.use('/api/v1/users', userRouter);

// rsolving dirname for ES module

// app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
// });


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Export the app and server
export { app, server };

