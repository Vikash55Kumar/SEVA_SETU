import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const socket = io("http://localhost:4000");

const EmployeeModel = ({isOpen, onClose, employeeTrackedData={}}) => {
    const [progress, setProgress] = useState({});
    const [previousDays, setPreviousDays] = useState([]);

    useEffect(() => {
        socket.on("progressUpdate", (updatedProgress) => {
        setProgress(updatedProgress);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const generateLast5Days = () => {
        const days = [];
        for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date);
        }
        return days;
    };

    useEffect(() => {
        const last5Days = generateLast5Days();
    
        const employeesData = [
        {
            id: 1,
            name: "John Doe",
            progress: last5Days.map((date, index) => ({
            date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
            verified: 85 + index * 5,
            target: 100,
            })),
        },
        ];
    
        setPreviousDays(employeesData);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl p-6 sm:p-8 bg-white shadow-lg rounded-lg">
        
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        Employee Progress Tracker
                    </h2>
                    <a className="text-black bg-white text-lg cursor-pointer" onClick={onClose}>✖</a>
                </div>
    
                {/* Employee Details */}
                <div className="flex justify-between text-lg font-medium text-gray-800 mt-3">
                    <span>{employeeTrackedData.fullName}</span>
                    <span>{employeeTrackedData.employeeId}</span>
                </div>
    
                {/* Today's Progress */}
                <div className="shadow-lg p-3 mt-2 rounded-lg">
                    <h3 className="text-xl text-black mb-2">Today's Progress</h3>
                    <ProgressBar
                        className={`progress-bar ${
                            progress?.verified >= progress?.target ? 'progress-bar-success' : 'progress-bar-danger'
                        }`}
                        now={(progress?.verified / progress?.target) * 100 || 0}
                        label={`${progress?.verified || 0}/${progress?.target || 100}`}
                        style={{ height: '30px' }}
                    />
                    <div className="mt-2 text-lg">
                        <FontAwesomeIcon
                            style={{ color: progress?.verified < progress?.target ? 'red' : 'green' }}
                            icon={faFlag}
                        />{' '}
                        {progress?.verified < progress?.target ? 'Not Completed' : 'Completed'}
                    </div>
                </div>
    
                {/* Previous Days' Data */}
                <div className="shadow-lg p-3 rounded-lg mt-4">
                    <h3 className="text-xl text-black">Previous Days' Data</h3>
                    {previousDays.map((employee) => (
                        <div key={employee.id} className="mt-3">
                            <ul className="list-disc list-inside text-gray-600">
                                {employee.progress.map((day, index) => {
                                    const flagColor = day.verified === day.target ? 'green' : 'red';
    
                                    return (
                                        <li key={index} className="mt-2">
                                            <span className="font-medium">Date:</span> {day.date}
                                            <ProgressBar
                                                className={`progress-bar ${
                                                    day.verified >= day.target ? 'progress-bar-success' : 'progress-bar-danger'
                                                }`}
                                                now={(day.verified / day.target) * 100}
                                                label={`${day.verified}/${day.target}`}
                                                style={{ height: '30px' }}
                                            />
                                            <div className="mt-1">
                                                <FontAwesomeIcon style={{ color: flagColor }} icon={faFlag} />{' '}
                                                {day.verified < day.target ? 'Not Completed' : 'Completed'}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
};

export default EmployeeModel;
