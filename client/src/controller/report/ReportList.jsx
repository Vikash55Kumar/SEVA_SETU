import React, { useMemo, useCallback, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import ReportModal from "./ReportModelView";
import moment from "moment"

const ReportList = React.memo(function ReportList({reportData=[]}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReportData, setIsReportData] = useState("")

    const processedReportData = useMemo(() => {
        return reportData.map((report) => ({ ...report, }));
      }, [reportData]);
    
      // 🛠️ Memoize function to prevent unnecessary re-creation
      const handleEditClick = useCallback((report) => {
        setIsReportData(report)
        setIsModalOpen(true)
        console.log(report);
      }, []);

  return (
    <>  
        <div className="overflow-x-auto bg-white p-4 m-4">
            <span className="flex justify-center text-4xl">Report List</span>
            <Table hoverable className="w-full border border-gray-400 mt-4">
                <TableHead>
                    <TableHeadCell>Date</TableHeadCell>
                    <TableHeadCell>Time</TableHeadCell>
                    <TableHeadCell>Location</TableHeadCell>
                    <TableHeadCell>Certificate Type</TableHeadCell>
                    <TableHeadCell>Total Forms</TableHeadCell>
                    <TableHeadCell>Pending Forms</TableHeadCell>
                    <TableHeadCell>Processing Forms</TableHeadCell>
                    <TableHeadCell>Rejected Forms</TableHeadCell>
                    <TableHeadCell> View </TableHeadCell>
                </TableHead>

                <TableBody className="divide-y ">              
                    {processedReportData.slice().reverse().map((report, index) => (
                        <TableRow key={index} className="bg-white border-gray-300">
                            <TableCell className="text-black font-bold">{moment(report.createdAt).format('DD-MM-YYYY')}</TableCell>
                            <TableCell className="text-black font-bold">{moment(report.createdAt).format('hh:mm:ss A')}</TableCell>
                            <TableCell className="text-black">{report.district}, {report.state}</TableCell>
                            <TableCell className="text-black font-medium">{report.formTitle}</TableCell>
                            <TableCell className="text-black text-center">{report.totalForms}</TableCell>
                            <TableCell className="text-yellow-600 text-center">{report.pendingForms}</TableCell>
                            <TableCell className="text-blue-600 text-center">{report.processedForms}</TableCell>
                            <TableCell className="text-red-600 text-center">{report.rejectedForms}</TableCell>
                            <TableCell>
                                <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer" onClick={() => handleEditClick(report)}  >
                                    View
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

        <ReportModal reportData={isReportData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
});

export {ReportList}
