// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import passport from './utils/passport.js';
// // import MongoStore from 'connect-mongo';

// const app = express();

// // CORS Setup
// app.use(cors({
//   origin: process.env.CORES_ORIGIN,
//   methods: 'DELETE, POST, GET, PUT',
//   credentials: true,
// }));

// // Body parsers and other middleware
// app.use(express.json({ limit: '20kb' }));
// app.use(express.urlencoded({ extended: true, limit: '20kb' }));
// app.use(cookieParser());
// app.use(bodyParser.json());

// // Setup Google session
// app.use(session({
//   secret: process.env.GOOGLE_CLIENT_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: process.env.NODE_ENV === 'production' },
// }));

// // Initialize Google passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Routers import
// import userRouter from './routes/user.route.js';
// app.use('/api/v1/users', userRouter);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// export { app };



import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './utils/passport.js';
import { createServer } from 'http';
import { SocketHandler } from './utils/socketHandler.js';  // Import the WebSocket handler
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const app = express();
const server = createServer(app); // Create a server instance

// Setup WebSocket
SocketHandler(server);

// CORS Setup
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: 'DELETE, POST, GET, PUT',
  credentials: true,
}));

// Body parsers and other middleware
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser());
app.use(bodyParser.json());

// Setup Google session
// app.use(session({
//   secret: process.env.GOOGLE_CLIENT_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: process.env.NODE_ENV === 'production' },
//   store: new MemoryStore({
//     checkPeriod: 86400000 // prune expired entries every 24h
//   }),
// }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false,  // Avoid saving uninitialized sessions
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,  // Session expiration time (14 days)
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
  }
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


// Export the app and server
export { app, server };




// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import passport from './utils/passport.js';
// import { createServer } from 'http';  // For WebSocket
// import { Server } from 'socket.io';   // WebSocket server

// const app = express();
// const server = createServer(app); // Create a server instance

// // WebSocket setup
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORES_ORIGIN,
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// // CORS Setup
// app.use(cors({
//   origin: process.env.CORES_ORIGIN,
//   methods: 'DELETE, POST, GET, PUT',
//   credentials: true,
// }));

// // Body parsers and other middleware
// app.use(express.json({ limit: '20kb' }));
// app.use(express.urlencoded({ extended: true, limit: '20kb' }));
// app.use(cookieParser());
// app.use(bodyParser.json());

// // Setup Google session
// app.use(session({
//   secret: process.env.GOOGLE_CLIENT_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: process.env.NODE_ENV === 'production' },
// }));

// // Initialize Google passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Routers import
// import userRouter from './routes/user.route.js';
// app.use('/api/v1/users', userRouter);

// // Mock employee data
// let employeeData = [
//   { id: 1, name: '', target: 100, verified: 20 },
//   { id: 2, name: 'Jane Smith', target: 100, verified: 10 }
// ];

// // WebSocket connection for real-time updates
// io.on('connection', (socket) => {
//   console.log('Client connected');

//   // Send the initial employee data when a client connects
//   socket.emit('employeeUpdate', employeeData);

//   // Example: Update employee data and broadcast changes every 5 seconds
//   setInterval(() => {
//     employeeData = employeeData.map(employee => {
//       // Simulate changes in verified forms
//       employee.verified = Math.min(employee.verified + Math.floor(Math.random() * 5), employee.target);
//       return employee;
//     });

//     // Send updated data to all clients
//     io.emit('employeeUpdate', employeeData);
//   }, 5000);

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Export the app and server
// export { app, server };
