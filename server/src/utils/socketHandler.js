// import dotenv from 'dotenv';
// dotenv.config({path: './.env'});
// import { Server } from 'socket.io';

// // Mock employee data
// let employeeData = [
//   { id: 1, target: 100, verified: 20 },

// ];

// let formStatistics = {
//   totalForms: 15880,
//   pendingForms: 6530,
//   processedForms: 9700,
//   recjectedForms: 1000,
// };

// // map
// let formData = [
//   { name: 'Cast Certificate', FormsReceived: 4200, PendingForms: 2240, ProcessedForms: 2879, RecjectedForms: 81 },
//   { name: 'Income Certificate', FormsReceived: 7800, PendingForms: 4200, ProcessedForms: 3579, RecjectedForms: 1021 },
//   { name: 'Birth Certificate', FormsReceived: 7000, PendingForms: 5150, ProcessedForms: 3439, RecjectedForms: 411 },
//   { name: 'Residential Certificate', FormsReceived: 6300, PendingForms: 5060, ProcessedForms: 1423, RecjectedForms: 234 },
// ];

// // Setup WebSocket connection for real-time updates
// export function SocketHandler(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: process.env.CORS_ORIGIN || "https://seva-setu.netlify.app",
//       methods: ['GET', 'POST', 'PUT', 'DELETE'],
//       credentials: true,
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('Client connected');

//     // Send the initial employee data when a client connects
//     socket.emit('employeeUpdate', employeeData);
//     socket.emit('formStatisticsUpdate', formStatistics);


//     // Example: Update employee data and broadcast changes every 5 seconds
//     setInterval(() => {

//       employeeData = employeeData.map(employee => {
//         // Simulate changes in verified forms
//         employee.verified = Math.min(employee.verified + Math.floor(Math.random() * 2), employee.target);
//         return employee;
//       });

//       // Simulate dynamic updates for form statistics
//       formStatistics = {
//         totalForms: formStatistics.totalForms + Math.floor(Math.random() * 10),
//         pendingForms: formStatistics.pendingForms + Math.floor(Math.random() * 5),
//         processedForms: formStatistics.processedForms + Math.floor(Math.random() * 5),
//         recjectedForms: formStatistics.recjectedForms + Math.floor(Math.random() * 2),
//       };

//       // Simulate dynamic updates for form statistics
//       formData = formData.map(form => {
//         form.FormsReceived += Math.floor(Math.random() * 10);  // Randomly increase FormsReceived
//         form.PendingForms = Math.max(0, form.PendingForms + Math.floor(Math.random() * 5 - 2)); // Random updates to pending forms
//         form.ProcessedForms = Math.min(form.FormsReceived, form.ProcessedForms + Math.floor(Math.random() * 5)); // Processed forms
//         form.RecjectedForms = Math.min(form.FormsReceived, form.RecjectedForms + Math.floor(Math.random() * 2)); // Rejected forms
//         return form;
//       });


//       // Send updated data to all clients
//       io.emit('employeeUpdate', employeeData);
//       io.emit('formStatisticsUpdate', formStatistics);
//       io.emit('mapformStatisticsUpdate', formData);
//     }, 5000);

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });
// }



import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { Server } from 'socket.io';
import cron from 'node-cron';

// Initial employee data
const initialEmployeeData = [
  { id: 1, target: 100, verified: 20 },
];

// Initial form statistics
const initialFormStatistics = {
  totalForms: 15880,
  pendingForms: 6530,
  processedForms: 9700,
  recjectedForms: 1000,
};

// Initial form data (map)
const initialFormData = [
  { name: 'Cast Certificate', FormsReceived: 4200, PendingForms: 2240, ProcessedForms: 2879, RecjectedForms: 81 },
  { name: 'Income Certificate', FormsReceived: 7800, PendingForms: 4200, ProcessedForms: 3579, RecjectedForms: 1021 },
  { name: 'Birth Certificate', FormsReceived: 7000, PendingForms: 5150, ProcessedForms: 3439, RecjectedForms: 411 },
  { name: 'Residential Certificate', FormsReceived: 6300, PendingForms: 5060, ProcessedForms: 1423, RecjectedForms: 234 },
];

// Mutable data that will change during the day
let employeeData = [...initialEmployeeData];
let formStatistics = { ...initialFormStatistics };
let formData = [...initialFormData];

// Function to reset data
function resetData() {
  employeeData = JSON.parse(JSON.stringify(initialEmployeeData));
  formStatistics = JSON.parse(JSON.stringify(initialFormStatistics));
  formData = JSON.parse(JSON.stringify(initialFormData));
  console.log('Data reset to initial state');
}

// Schedule the reset to occur at midnight every day
cron.schedule('0 */12 * * *', () => {
  console.log('Resetting data to initial state at midnight');
  resetData();
});

// Setup WebSocket connection for real-time updates
export function SocketHandler(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "https://seva-setu.netlify.app",
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Send the initial employee data and form statistics when a client connects
    socket.emit('employeeUpdate', employeeData);
    socket.emit('formStatisticsUpdate', formStatistics);
    // socket.emit('mapformStatisticsUpdate', formData);

    // Example: Update employee data and broadcast changes every 5 seconds
    setInterval(() => {
      employeeData = employeeData.map(employee => {
        // Simulate changes in verified forms
        employee.verified = Math.min(employee.verified + Math.floor(Math.random() * 2), employee.target);
        return employee;
      });

      // Simulate dynamic updates for form statistics
      formStatistics = {
        totalForms: formStatistics.totalForms + Math.floor(Math.random() * 10),
        pendingForms: formStatistics.pendingForms + Math.floor(Math.random() * 5),
        processedForms: formStatistics.processedForms + Math.floor(Math.random() * 5),
        recjectedForms: formStatistics.recjectedForms + Math.floor(Math.random() * 2),
      };

      // Simulate dynamic updates for form statistics
      formData = formData.map(form => {
        form.FormsReceived += Math.floor(Math.random() * 10);  // Randomly increase FormsReceived
        form.PendingForms = Math.max(0, form.PendingForms + Math.floor(Math.random() * 5 - 2)); // Random updates to pending forms
        form.ProcessedForms = Math.min(form.FormsReceived, form.ProcessedForms + Math.floor(Math.random() * 5)); // Processed forms
        form.RecjectedForms = Math.min(form.FormsReceived, form.RecjectedForms + Math.floor(Math.random() * 2)); // Rejected forms
        return form;
      });

      // Send updated data to all clients
      io.emit('employeeUpdate', employeeData);
      io.emit('formStatisticsUpdate', formStatistics);
      io.emit('mapformStatisticsUpdate', formData);
    }, 5000);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}
