// import 'chart.js/auto';

// export const getChartData = (totalStats) => ({
//     labels: ['Total Forms', 'Pending Forms', 'Processed Forms', 'Rejected Forms'],
//     datasets: [
//       {
//         label: 'Forms Statistics',
//         data: [
//             totalStats.totalForms,
//             totalStats.pendingForms,
//             totalStats.processedForms,
//             totalStats.rejectedForms,
//         ],
//         backgroundColor: ['#007bff', '#ffc107', '#28a745', 'red'],
//         borderColor: ['#007bff', '#ffc107', '#28a745', 'red'],
//         borderWidth: 1,
//       },
//     ],
//   });

export const getChartData = (totalStats) => [
  {
    name: "Leads",
    data: [ totalStats.totalForms, totalStats.pendingForms, totalStats.processedForms, totalStats.rejectedForms ]
  },
];


// export  const series = [{ name: "Leads", data: [reportData.totalForms, reportData.pendingForms, reportData.processedForms, reportData.rejectedForms] }];

  export const getChartData2 = (totalStats) => ({

    name: 'Forms Statistics',
        data: [ totalStats.totalForms, totalStats.pendingForms, totalStats.processedForms, totalStats.rejectedForms ],
  });


  