import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// import passport from './utils/passport.js';
import { createServer } from 'http';
import { SocketHandler } from './utils/socketHandler.js';  // Import the WebSocket handler
import adminRouter from './routes/admin.router.js'
import employeeRouter from './routes/employee.route.js'
import userRouter from "./routes/user.route.js"
import reportRouter from './routes/report.router.js'
import certificateRouter from "./routes/certificate.route.js"
import MongoStore from 'connect-mongo';
import path from 'path';

const app = express();
const server = createServer(app); // Create a server instance

// Setup WebSocket
SocketHandler(server);

// CORS Setup
app.use(cors({
  // origin: "http://localhost:5173",
  origin: [process.env.CORES_ORIGIN || "https://sevasetu.ecovix.online"],
  methods: 'DELETE, POST, GET, PUT',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], 
  credentials: true,
}));


// Body parsers and other middleware
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(cookieParser());
app.use(bodyParser.json());

// build


const __dirname = path.resolve();

const buildPath = path.join(__dirname, '../../client/dist');
// console.log('Build Path:', buildPath);
// console.log('Files in Build Path:', fs.readdirSync(buildPath));

app.use(express.static(buildPath)); 

// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next(); // Skip static file serving for API routes
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

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

// Initialize Google passport

// app.use(passport.initialize());
// app.use(passport.session());


// Routers import
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/certificate', certificateRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app and server
export { app, server };

