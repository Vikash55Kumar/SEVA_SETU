import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../actions/userAction";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const [isSubDropdownOpen2, setIsSubDropdownOpen2] = useState(false);
    const dispatch = useDispatch();
    const nevigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        
        nevigate("/")
    };
    
    const toggleMenu = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSubDropdown = () => {
        setIsSubDropdownOpen(!isSubDropdownOpen);
    };

    const toggleSubDropdown2 = () => {
        setIsSubDropdownOpen2(!isSubDropdownOpen2);
    };

    return (
        <div className="navbar">
            <a href="/"><img src={logo} className="logo" alt="Logo" /></a>

            <div className={`menu-toggle ${isNavOpen ? "open" : ""}`} onClick={toggleMenu}>
                <FaBars className="fa-bars" />
                <FaTimes className="fa-times" />
            </div>
            
            <div className={`nav-links ${isNavOpen ? "active" : ""}`}>
                <a href="/">Home</a>
                {isAuthenticated ? <a href="/profile">Profile</a> : ""}
                
                <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
                    <a href="#!" className="dropdown-toggle" onClick={toggleDropdown}>
                        Services
                    </a>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="#!" className="dropdown-toggle" onClick={toggleSubDropdown}>
                                Rajasthan
                            </a>
                            {isSubDropdownOpen && (
                                <div className="dropdown-menu nested-dropdown">
                                    <a href="/dashboard">Jodhpur</a>
                                    <a href="/service2">Jaipur</a>
                                    <a href="/service3">Kota</a>
                                    <a href="/service3">Udaipur</a>
                                </div>
                            )}

                            {/* Delhi */}
                            {/* <a href="#!" className="dropdown-toggle" onClick={toggleSubDropdown2}>
                                Delhi
                            </a>
                            {isSubDropdownOpen2 && (
                                <div className="dropdown-menu nested-dropdown">
                                    <a href="/service1">North</a>
                                    <a href="/service2">North-East</a>
                                    <a href="/service3">South-West</a>
                                    <a href="/service3">West</a>
                                </div>
                            )} */}
                        </div>
                    )}
                </div>
                
                <a href="/contact">Contact Us</a>
                <div className="user-profile">
                    <FaUserCircle style={{ fontSize: "2rem" }} />
                    <div className="dropdown-content">
                        {isAuthenticated ? (
                            <>
                                <a href="/" onClick={handleLogout}>Logout</a>
                            </>
                        ) : (
                            <>
                                <a href="/signup">Signup</a>
                                <a href="/login">Login</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;




{/* <a href="/dashboard">Dashboard</a> */}













// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
// import { logout } from "../../actions/userAction";
// import "./Navbar.css";
// import logo from "../../assets/logo.png";

// const Navbar = () => {
//     const [isNavOpen, setIsNavOpen] = useState(false);
//     const dispatch = useDispatch();
//     const { isAuthenticated } = useSelector((state) => state.user);

//     const handleLogout = (e) => {
//         e.preventDefault();
//         dispatch(logout());
//     };
    
//     const toggleMenu = () => {
//         setIsNavOpen(!isNavOpen);
//     };

//     return (
//         <div className="navbar">
//             <a href="/"><img src={logo} className="logo" alt="Logo" /></a>

//             <div className={`menu-toggle ${isNavOpen ? "open" : ""}`} onClick={toggleMenu}>
//                 <FaBars className="fa-bars" />
//                 <FaTimes className="fa-times" />
//             </div>
            
//             <div className={`nav-links ${isNavOpen ? "active" : ""}`}>
//                 <a href="/">Home</a>
//                 <a href="/dashboard">Dashboard</a>
//                 <a href="/certificate">Services</a>             
//                 <a href="/contact">Contact Us</a>
//                 <div className="user-profile">
//                     <FaUserCircle style={{ fontSize: "2rem" }} />
//                     <div className="dropdown-content">
//                         {isAuthenticated ? (
//                             <>
//                                 <a href="/profile">Profile</a>
//                                 <a href="/" onClick={handleLogout}>Logout</a>
//                             </>
//                         ) : (
//                             <>
//                                 <a href="/signup">Signup</a>
//                                 <a href="/login">Login</a>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
