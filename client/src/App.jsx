import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct component names
// import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './controller/navbar/Navbar';
import Footer from './controller/footer/Footer';
import TermService from './controller/term/TermService';
import Dashboard from './controller/dashboard/Dashboard';
import Certificate from './controller/certificate/Certificate';
import Contact from './controller/contact/Contact';
// import CertificateForm from './controller/certificate/CertificateForm';
import ForgotPassword from './controller/user/ForgotPassword';
import NotFound from './utility/NotFound';
import GoogleLogin from './utility/GoogleLogin';
import Home from './controller/home/Home';
import Profile from './controller/profile/Profile';
import { SocketProvider } from './utility/SocketContext';
import EmployeeProgress from './controller/profile/EmployProgress.jsx';
import { ToastContainer } from 'react-toastify';
import CastCertificate from './controller/dashboard/CastCertificate';
import IncomeCertificate from './controller/dashboard/IncomeCertificate';
import ResidentialCertificate from './controller/dashboard/ResidentalCertificate';
import MerriageCertificate from './controller/dashboard/MarriageCertificate';
import SeniorcitizenCertificate from './controller/dashboard/SeniorcitizenCertificate';
import RationcardCertificate from './controller/dashboard/RationcardCertificate';
import DisabilityCertificate from './controller/dashboard/DisabilityCertificate';
import CharacterCertificate from './controller/dashboard/CharacterCertificate';
import BirthCertificate from './controller/dashboard/BirthCertificate';
import { getAdminDetails, getReport, loadAdmin } from './actions/adminAction';
import { getEmployeeDetails, loadEmployee } from './actions/employeeAction.js';
import AdminLogin from './controller/user/AdminLogin';
import EmployeeLogin from './controller/user/EmployeeLogin.jsx';
import EmployeeSignup from './controller/user/EmployeeSignup.jsx';
import UserLogin from './controller/user/UserLogin.jsx';
import {ReportList} from './controller/report/ReportList';
import ReportDashboard from './controller/report/ReportDashboard';
import CasteCertificateForm from './controller/certificate/CasteFormCertificate';
// import Form from './controller/certificate/Form';
import CertificateDashboard from './controller/resourceDashboard/CertificateDashboard';
import EmployCertificateDashboard from './controller/resourceDashboard/EmployCertificateDashboard';
import FinalCertificate from './dwnCert/FinalCertificate';
import ReportModelView from './controller/report/ReportModelView';
import EmployeeTracker from './controller/profile/AdminProfile/EmployeeTracker.jsx';
import EmployeeModel from './controller/profile/AdminProfile/EmployeeModel.jsx';
import ResourceAllocationComponent from './controller/resourceDashboard/ResourceAllocation.jsx';
import { getUserDetails, loadUser } from './actions/userAction.js';
import UserTracker from './controller/profile/EmployeeProfile/UserTracker.jsx';
import UserDashboard from './controller/profile/UserProfile/UserDashboard.jsx';
import { getCertificateDetails } from './actions/certificateReportAction.js';
import CertificateTracker from './controller/profile/EmployeeProfile/CertificateTracker.jsx';
import OtrRegestration from './controller/user/OtrRegestration.jsx';
import RefundPolicy from './controller/term/RefundPolicy.jsx';
import { Privacy } from './controller/term/Privacy.jsx';
import SpinnerLoader from './utility/SpinnerLoader.jsx';

// import ReportPdf from './controller/report/ReportPdf';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getUserDetails());
    dispatch(loadEmployee());
    dispatch(loadAdmin());
    dispatch(getEmployeeDetails());
    dispatch(getAdminDetails())
    dispatch(getReport())
    dispatch(getCertificateDetails())
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.admin?.isAuthenticated || state.employee?.isAuthenticated|| state.user?.isAuthenticated,
  }));

  // console.log(isAuthenticated);
  
  const { user} = useSelector((state) => state.user);

  const { userDetail} = useSelector((state) => state.userDetail);
  
  const { employee} = useSelector((state) => state.employee);

  const { employeeDetail} = useSelector((state) => state.employeeDetail);

  const { admin } = useSelector((state) => state.admin);

  const {report} = useSelector((state) => state.report);

  const {certificateDetail} = useSelector((state) => state.certificateDetail);
  
  const { loading } = useSelector((state) => state.loading);
  console.log("user",loading, "employee", "admin");

  const districts = [
    {
      _id: "1",
      name: "",
      subdivisions: [
        { _id: "1-1", name: "Subdivision A" },
        { _id: "1-2", name: "Subdivision B" },
      ],
    },
    {
      _id: "2",
      name: "District 2",
      subdivisions: [
        { _id: "2-1", name: "Subdivision C" },
        { _id: "2-2", name: "Subdivision D" },
      ],
    },
  ];
  
  const cases = [
    {
      _id: "case1",
      certificateType: "Caste",
      allocation: "5",
      totalCertificate: "50",
      pendingCertificate: "10",
      doneCertificate: "40",
      freeResource: "2",
      subdivisionId: "1-1",
    },
    {
      _id: "case2",
      certificateType: "Birth",
      allocation: "3",
      totalCertificate: "30",
      pendingCertificate: "5",
      doneCertificate: "25",
      freeResource: "10",
      subdivisionId: "1-2",
    },
    {
      _id: "case3",
      certificateType: "Income",
      allocation: "4",
      totalCertificate: "40",
      pendingCertificate: "15",
      doneCertificate: "25",
      freeResource: "2",
      subdivisionId: "2-1",
    },
    {
      _id: "case4",
      certificateType: "Residence",
      allocation: "6",
      totalCertificate: "60",
      pendingCertificate: "20",
      doneCertificate: "40",
      freeResource: "3",
      subdivisionId: "2-2",
    },
  ];

  const states = [
    {
      _id: "state1",
      name: "Delhi",
      districts: [
        {
          _id: "district1",
          name: "South East",
          subdivisions: [
            { _id: "subdivision1", name: "Subdivision 1" },
            { _id: "subdivision2", name: "Subdivision 2" },
          ],
        },
        {
          _id: "district2",
          name: "North-East",
          subdivisions: [
            { _id: "subdivision3", name: "Subdivision 3" },
            { _id: "subdivision4", name: "Subdivision 4" },
          ],
        },

        {
          _id: "district1",
          name: "South-West",
          subdivisions: [
            { _id: "subdivision1", name: "Subdivision 1" },
            { _id: "subdivision2", name: "Subdivision 2" },
          ],
        },

        {
          _id: "district1",
          name: "West",
          subdivisions: [
            { _id: "subdivision1", name: "Subdivision 1" },
            { _id: "subdivision2", name: "Subdivision 2" },
          ],
        },
      ],
    },
    // {
    //   _id: "state2",
    //   name: "State B",
    //   districts: [
    //     {
    //       _id: "district3",
    //       name: "District 3",
    //       subdivisions: [
    //         { _id: "subdivision5", name: "Subdivision 5" },
    //         { _id: "subdivision6", name: "Subdivision 6" },
    //       ],
    //     },
    //   ],
    // },
  ];

  return (
    <>
       <ToastContainer 
        position="top-center"  // This will show the toast in the center of the screen
        autoClose={3000}  // Toast will disappear after 4 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <SpinnerLoader /> */}
      <SocketProvider>
        <Router>
        {loading ? <SpinnerLoader /> : (
          <>
          <Navbar adminProfile={admin?.data || null} employeeProfile={employee?.data} userProfile={user?.data} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={isAuthenticated ? <Dashboard adminProfile={admin?.data || null} /> : <EmployeeLogin /> } />
            <Route path='/certificate' element={isAuthenticated ? <Certificate /> : <EmployeeLogin />} />
            {/* <Route path='/certificateForm' element={<CertificateForm />} /> */}
            <Route path='/otrRegestration' element={<OtrRegestration />} />
            <Route path='/profile'  element={<Profile profile={employee?.data || null} adminProfile={admin?.data || null} />}/>
            <Route path='/employeeTracker' element={<EmployeeTracker profile={employee?.data || null} adminProfile={admin?.data || null} employeeDetail={employeeDetail.data} />}/>
            <Route path='/userTracker' element={<UserTracker profile={employee?.data} userDetail={userDetail?.data} />} /> 
            <Route path='/employProgress' element={<EmployeeProgress employeeProfile={employee?.data || null} adminProfile={admin?.data || null} /> } />
            <Route path='/contact' element={<Contact />} />
            <Route path='/employeeLogin' element={!isAuthenticated ? <EmployeeLogin /> : <Home/>} />
            <Route path='/adminLogin' element={<AdminLogin /> } />
            <Route path='/employeeSignup' element={<EmployeeSignup />} />
            <Route path="/google-login" element={<GoogleLogin />} />
            <Route path='/forgot' element={<ForgotPassword /> } />
            <Route path='/term' element={<TermService />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/refund' element={<RefundPolicy />} />
            <Route path='/userLogin' element={<UserLogin />} />
            {/* <Route path='/form' element={<Form /> } /> */}
            <Route path='/casteForm' element={<CasteCertificateForm />} />
            <Route path='/casteCertificate' element={<CastCertificate adminProfile={admin?.data || null} />} />
            <Route path='/incomeCertificate' element={<IncomeCertificate adminProfile={admin?.data || null} />} />
            <Route path='/merriageCertificate' element={ <MerriageCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/seniorcitizenCertificate' element={ <SeniorcitizenCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/rationcardCertificate' element={ <RationcardCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/disabilityCertificate' element={ <DisabilityCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/characterCertificate' element={ <CharacterCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/birthCertificate' element={ <BirthCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/residentialCertificate' element={ <ResidentialCertificate adminProfile={admin?.data || null} /> } />
            <Route path='/reportList' element={<ReportList reportData={report?.data} />} />
            <Route path="/reportDashboard" element={<ReportDashboard adminProfile={admin?.data || null} />} />
            <Route path='/dwn' element={<FinalCertificate certificateDatas={certificateDetail?.data} />} />
            <Route path='/certificateDashboard' element={<CertificateDashboard adminProfile={admin?.data} states={states} districts={districts} cases={cases} /> } />
            <Route path='/EmployCertificateDashboard' element={<EmployCertificateDashboard employeeProfile={employee?.data} states={states} districts={districts} cases={cases} /> } />
            <Route path='/ReportModel' element={<ReportModelView />} />
            <Route path='/resourceAllocation' element={<ResourceAllocationComponent employeeData={employeeDetail?.data} reportData={report?.data} />} />
            <Route path='/userDashboard' element={<UserDashboard userProfile={user?.data} certificateDetail={certificateDetail?.data} />} />
            <Route path='/certificateTracker' element={<CertificateTracker employeeProfile={employee?.data} userDetail={userDetail?.data} certificateDetail={certificateDetail?.data} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          </>
        )}
        </Router>
      </SocketProvider>
    </>
  );
}

export default App;
