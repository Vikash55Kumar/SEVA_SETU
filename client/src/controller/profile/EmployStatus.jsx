import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from 'react-bootstrap'; // Ensure this is installed and properly imported
import "./employ.css";


const socket = io(`${import.meta.env.VITE_SOCKET_URL}`); // Connect to your backend

const EmployeeProgress = ({ profile = {} }) => {
  const { fullName, email, avatar } = profile || {};
  
  const [employees, setEmployees] = useState([]);

  const [previousProgress, setPreviousProgress] = useState([]);

  useEffect(() => {
    // Listen for real-time employee updates
    socket.on('employeeUpdate', (data) => {
      setEmployees(data);
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);


  //previous



  const generateLast5Days = () => {
    const days = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };


  useEffect(() => {
    // Simulating data for the last 5 days for employees
    const last5Days = generateLast5Days();

    // Example data for multiple employees
    const employeesData = [
      {
        id: 1,
        progress: last5Days.map((date, index) => ({
          date: date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
          verified: 85 + index * 5,
          target: 100, 
        })),
      },
    ];

    setPreviousProgress(employeesData);
  }, []);

  return (
    <div className='body4'>
      <div className="profile-background">
        <h2>Details of Employees</h2>
        <div className="profile-container">
          <div className="menu">
            <h2>{fullName || 'Full Name Not Available'}</h2>
            <div className="button">Task Status</div>
            <div className="button"><a href='/profile'>Profile Info</a></div>
            <div className="button">Edit Details</div>
            <div className="button"><a href='/forgot'>Change Password</a></div>
          </div>

          <div className="profile-display">
            <div className="profile">
              <div className="profile-header">
                <div className="image">
                  <img src={profile.image?.url || avatar} alt="Profile" />
                </div>
                <div className="name">
                  <h2>{fullName || 'Full Name Not Available'}</h2>
                  <h5>{email || 'Email Not Available'}</h5>
                </div>
              </div>
            </div>
            <div className="contact">
              <h3>TODAY'S PROGRESS</h3>
              {employees.map((employee) => {
                // Determine the color based on the completion status
                const flagColor = employee.verified === employee.target ? 'green' : 'red';

                return (
                  <div key={employee.id} style={{ marginBottom: '20px' }}>
                    <ProgressBar
                      className={`progress-bar ${employee.verified >= employee.target ? 'progress-bar-success' : 'progress-bar-danger'}`}
                      now={(employee.verified / employee.target) * 100}
                      label={`${employee.verified}/${employee.target}`}
                      style={{ height: '30px' }}
                    />
                    {employee.verified < employee.target ? (
                      <span >
                        <FontAwesomeIcon style={{ color: flagColor }} icon={faFlag} /> &nbsp; Not Completed
                      </span>
                    ) : (<span >
                      <FontAwesomeIcon style={{ color: flagColor }} icon={faFlag} />&nbsp; Completed
                    </span>)}
                  </div>
                );
              })}
            </div>

            {/* multiplel display */}


          <div className="contact">
            <h3>PREVIOUS PROGRESS</h3>
            {previousProgress.map((employee) => (
              <div key={employee.id}>
                {employee.progress.map((dayProgress, index) => {
                  const flagColor = dayProgress.verified === dayProgress.target ? 'green' : 'red';

                  return (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      <p>{new Date(dayProgress.date).toLocaleDateString()}</p>
                      <ProgressBar
                        className={`progress-bar ${dayProgress.verified >= dayProgress.target ? 'progress-bar-success' : 'progress-bar-danger'}`}
                        now={(dayProgress.verified / dayProgress.target) * 100}
                        label={`${dayProgress.verified}/${dayProgress.target}`}
                        style={{ height: '30px' }}
                      />
                      {dayProgress.verified < dayProgress.target ? (
                        <span>
                          <FontAwesomeIcon style={{ color: flagColor }} icon={faFlag} /> &nbsp; Not Completed
                        </span>
                      ) : (
                        <span>
                          <FontAwesomeIcon style={{ color: flagColor }} icon={faFlag} /> &nbsp; Completed
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            <br/>
            <br/>
            <br/>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProgress;
