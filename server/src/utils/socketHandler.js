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
//   rejectedForms: 1000,
// };

// // map
// let formData = [
//   { name: 'Cast Certificate', FormsReceived: 4200, PendingForms: 2240, ProcessedForms: 2879, rejectedForms: 81 },
//   { name: 'Income Certificate', FormsReceived: 7800, PendingForms: 4200, ProcessedForms: 3579, rejectedForms: 1021 },
//   { name: 'Birth Certificate', FormsReceived: 7000, PendingForms: 5150, ProcessedForms: 3439, rejectedForms: 411 },
//   { name: 'Residential Certificate', FormsReceived: 6300, PendingForms: 5060, ProcessedForms: 1423, rejectedForms: 234 },
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
//         rejectedForms: formStatistics.rejectedForms + Math.floor(Math.random() * 2),
//       };

//       // Simulate dynamic updates for form statistics
//       formData = formData.map(form => {
//         form.FormsReceived += Math.floor(Math.random() * 10);  // Randomly increase FormsReceived
//         form.PendingForms = Math.min(form.PendingForms + Math.floor(Math.random() * 3)); // Random updates to pending forms
//         form.ProcessedForms = Math.min(form.FormsReceived, form.ProcessedForms + Math.floor(Math.random() * 5)); // Processed forms
//         form.rejectedForms = Math.min(form.FormsReceived, form.rejectedForms + Math.floor(Math.random() * 2)); // Rejected forms
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
let initialFormStatistics = {
  totalForms: 23618,
  pendingForms: 7090,
  processedForms: 14434,
  rejectedForms: 2094,
};
// const initialFormStatistics = { totalForms: 23618, pendingForms: 7090, processedForms: 14434, rejectedForms: 2094 };

// Certificate
const initialCastCertificate = { totalForms: 3634, pendingForms: 1286, processedForms: 2100, rejectedForms: 248}
const initialBirthCertificate = { totalForms: 2043, pendingForms: 1235, processedForms: 608, rejectedForms: 200}
const initialCharacterCertificate = { totalForms: 2133, pendingForms: 456, processedForms: 1537, rejectedForms: 140}
const initialDisabilityCertificate = { totalForms: 1219, pendingForms: 290, processedForms: 854, rejectedForms: 75}
const initialIncomeCertificate = { totalForms: 2374, pendingForms: 587, processedForms: 1700, rejectedForms: 87}
const initialMarrageCertificate = { totalForms: 2389, pendingForms: 349, processedForms: 1897, rejectedForms: 143}
const initialRationCertificate = { totalForms: 2754, pendingForms: 290, processedForms: 1894, rejectedForms: 570}
const initialResidentalCertificate = { totalForms: 3634, pendingForms: 1308, processedForms: 1859, rejectedForms: 476}
const initialSeciorCertificate = { totalForms: 2429, pendingForms: 289, processedForms: 1985, rejectedForms: 155}

// Initial form data (map)
const initialFormData = [
  { name: 'Cast Certificate', FormsReceived: 3634, PendingForms: 1286, ProcessedForms: 2100, rejectedForms: 248 },
  { name: 'Income Certificate', FormsReceived: 2374, PendingForms: 587, ProcessedForms: 1700, rejectedForms: 87 },
  { name: 'Birth Certificate', FormsReceived: 2043, PendingForms: 1235, ProcessedForms: 608, rejectedForms: 200 },
  { name: 'Residential Certificate', FormsReceived: 3643, PendingForms: 1308, ProcessedForms: 1859, rejectedForms: 476 },
];

// Mutable data that will change during the day
let employeeData = [...initialEmployeeData];
let formStatistics = { ...initialFormStatistics };
let formData = [...initialFormData];

//Certificate
let castData = {...initialCastCertificate}
let birthData = {...initialBirthCertificate}
let characterData = {...initialCharacterCertificate}
let disabilityData = {...initialDisabilityCertificate}
let incomeData = {...initialIncomeCertificate}
let marrageData = {...initialMarrageCertificate}
let rationData = {...initialRationCertificate}
let residentialData = {...initialResidentalCertificate}
let seniorData = {...initialSeciorCertificate}

// Function to reset data
function resetData() {
  employeeData = JSON.parse(JSON.stringify(initialEmployeeData));
  formStatistics = JSON.parse(JSON.stringify(initialFormStatistics));
  formData = JSON.parse(JSON.stringify(initialFormData));

  // Certificate
  castData = JSON.parse(JSON.stringify(initialCastCertificate));
  birthData = JSON.parse(JSON.stringify(initialBirthCertificate));
  characterData = JSON.parse(JSON.stringify(initialCharacterCertificate));
  disabilityData = JSON.parse(JSON.stringify(initialDisabilityCertificate));
  incomeData = JSON.parse(JSON.stringify(initialIncomeCertificate));
  marrageData = JSON.parse(JSON.stringify(initialMarrageCertificate));
  rationData = JSON.parse(JSON.stringify(initialRationCertificate));
  residentialData = JSON.parse(JSON.stringify(initialResidentalCertificate));
  seniorData = JSON.parse(JSON.stringify(initialSeciorCertificate));



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
      // origin: "http://localhost:5173", // Update with your frontend's URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Send the initial data to the newly connected client
    socket.emit('employeeUpdate', employeeData);
    socket.emit('formStatisticsUpdate', formStatistics);
    socket.emit('mapformStatisticsUpdate', formData);

    // Certificate
    socket.emit('casteCertificateUpdate', castData);
    socket.emit('birthCertificateUpdate', birthData);
    socket.emit('characterCertificateUpdate', characterData);
    socket.emit('disabilityCertificateUpdate', disabilityData);
    socket.emit('incomeCertificateUpdate', incomeData);
    socket.emit('merrageCertificateUpdate', marrageData);
    socket.emit('rationCertificateUpdate', rationData);
    socket.emit('residentalCertificateUpdate', residentialData);
    socket.emit('seniorCertificateUpdate', seniorData);

    // Example: Update and broadcast dynamic changes every 5 seconds
    const intervalId = setInterval(() => {
      // Update employee data
      employeeData = employeeData.map(employee => {
        employee.verified = Math.min(employee.verified + Math.floor(Math.random() * 2), employee.target);
        return employee;
      });

      // Update form statistics
      formStatistics = {
        totalForms: formStatistics.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(formStatistics.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(formStatistics.totalForms, formStatistics.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(formStatistics.totalForms, formStatistics.rejectedForms + Math.floor(Math.random() * 2)),
      };

      // Update form data
      formData = formData.map(form => {
        form.FormsReceived += Math.floor(Math.random() * 10);
        form.PendingForms = Math.min(form.PendingForms + Math.floor(Math.random() * 3));
        form.ProcessedForms = Math.min(form.FormsReceived, form.ProcessedForms + Math.floor(Math.random() * 5));
        form.rejectedForms = Math.min(form.FormsReceived, form.rejectedForms + Math.floor(Math.random() * 2));
        return form;
      });


      // Update Certificate Form Data
      castData = {
        totalForms: castData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(castData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(castData.totalForms, castData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(castData.totalForms, castData.rejectedForms + Math.floor(Math.random() * 2)),
      };
      birthData = {
        totalForms: birthData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(birthData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(birthData.totalForms, birthData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(birthData.totalForms, birthData.rejectedForms + Math.floor(Math.random() * 2)),
      }; 
      characterData = {
        totalForms: characterData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(characterData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(characterData.totalForms, characterData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(characterData.totalForms, characterData.rejectedForms + Math.floor(Math.random() * 2)),
      }; 
      disabilityData = {
        totalForms: disabilityData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(disabilityData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(disabilityData.totalForms, disabilityData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(disabilityData.totalForms, disabilityData.rejectedForms + Math.floor(Math.random() * 2)),
      }; 
      incomeData = {
        totalForms: incomeData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(incomeData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(incomeData.totalForms, incomeData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(incomeData.totalForms, incomeData.rejectedForms + Math.floor(Math.random() * 2)),
      };
      incomeData = {
        totalForms: incomeData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(incomeData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(incomeData.totalForms, incomeData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(incomeData.totalForms, incomeData.rejectedForms + Math.floor(Math.random() * 2)),
      };      
      marrageData = {
        totalForms: marrageData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(marrageData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(marrageData.totalForms, marrageData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(marrageData.totalForms, marrageData.rejectedForms + Math.floor(Math.random() * 2)),
      };      
      rationData = {
        totalForms: rationData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(rationData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(rationData.totalForms, rationData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(rationData.totalForms, rationData.rejectedForms + Math.floor(Math.random() * 2)),
      };      
      residentialData = {
        totalForms: residentialData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(residentialData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(residentialData.totalForms, residentialData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(residentialData.totalForms, residentialData.rejectedForms + Math.floor(Math.random() * 2)),
      };
      seniorData = {
        totalForms: seniorData.totalForms + Math.floor(Math.random() * 10),
        pendingForms: Math.min(seniorData.pendingForms + Math.floor(Math.random() * 3)),
        processedForms: Math.min(seniorData.totalForms, seniorData.processedForms + Math.floor(Math.random() * 5)),
        rejectedForms: Math.min(seniorData.totalForms, seniorData.rejectedForms + Math.floor(Math.random() * 2)),
      };
      
      // Broadcast updated data to all clients
      io.emit('employeeUpdate', employeeData);
      io.emit('formStatisticsUpdate', formStatistics);
      io.emit('mapformStatisticsUpdate', formData);

      // Certificate
      socket.emit('casteCertificateUpdate', castData);
      socket.emit('birthCertificateUpdate', birthData);
      socket.emit('characterCertificateUpdate', characterData);
      socket.emit('disabilityCertificateUpdate', disabilityData);
      socket.emit('incomeCertificateUpdate', incomeData);
      socket.emit('merrageCertificateUpdate', marrageData);
      socket.emit('rationCertificateUpdate', rationData);
      socket.emit('residentalCertificateUpdate', residentialData);
      socket.emit('seniorCertificateUpdate', seniorData);


    }, 5000);

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected');
      clearInterval(intervalId); // Clean up interval when client disconnects
    });
  });
}




















// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });
// import { Server } from 'socket.io';
// import cron from 'node-cron';

// // Initial employee data
// const initialEmployeeData = [
//   { id: 1, target: 100, verified: 20 },
// ];

// // Initial form statistics
// const initialFormStatistics = {
//   totalForms: 15880,
//   pendingForms: 6530,
//   processedForms: 9700,
//   rejectedForms: 1000,
// };

// // Initial form data (map)
// const initialFormData = [
//   { name: 'Cast Certificate', FormsReceived: 4200, PendingForms: 2240, ProcessedForms: 2879, rejectedForms: 81 },
//   { name: 'Income Certificate', FormsReceived: 7800, PendingForms: 4200, ProcessedForms: 3579, rejectedForms: 1021 },
//   { name: 'Birth Certificate', FormsReceived: 7000, PendingForms: 5150, ProcessedForms: 3439, rejectedForms: 411 },
//   { name: 'Residential Certificate', FormsReceived: 6300, PendingForms: 5060, ProcessedForms: 1423, rejectedForms: 234 },
// ];

// // Mutable data that will change during the day
// let employeeData = [...initialEmployeeData];
// let formStatistics = { ...initialFormStatistics };
// let formData = [...initialFormData];

// // Function to reset data
// function resetData() {
//   employeeData = JSON.parse(JSON.stringify(initialEmployeeData));
//   formStatistics = JSON.parse(JSON.stringify(initialFormStatistics));
//   formData = JSON.parse(JSON.stringify(initialFormData));
//   console.log('Data reset to initial state');
// }

// // Schedule the reset to occur at midnight every day
// cron.schedule('0 */12 * * *', () => {
//   console.log('Resetting data to initial state at midnight');
//   resetData();
// });

// // Setup WebSocket connection for real-time updates
// export function SocketHandler(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173" ,
//       // origin: process.env.CORS_ORIGIN || "https://seva-setu.netlify.app",
//       methods: ['GET', 'POST', 'PUT', 'DELETE'],
//       credentials: true,
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('Client connected');

//     // Send the initial employee data and form statistics when a client connects
//     socket.emit('employeeUpdate', employeeData);
//     socket.emit('formStatisticsUpdate', formStatistics);
//     // socket.emit('mapformStatisticsUpdate', formData);

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
//         rejectedForms: formStatistics.rejectedForms + Math.floor(Math.random() * 2),
//       };

//       // Simulate dynamic updates for form statistics
//       formData = formData.map(form => {
//         form.FormsReceived += Math.floor(Math.random() * 10);  // Randomly increase FormsReceived
//         form.PendingForms = Math.min(form.PendingForms + Math.floor(Math.random() * 3)); // Random updates to pending forms
//         form.ProcessedForms = Math.min(form.FormsReceived, form.ProcessedForms + Math.floor(Math.random() * 5)); // Processed forms
//         form.rejectedForms = Math.min(form.FormsReceived, form.rejectedForms + Math.floor(Math.random() * 2)); // Rejected forms
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
