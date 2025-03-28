import React, { useEffect, useState } from "react";
import "./OtrRegestration.css";
import logo from "../../assets/logo.png"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { generateAadharOtp, register, verifyAadhar } from "../../actions/userAction";
import PhoneInput from "react-phone-input-2";
import SpinnerLoader from "../../utility/SpinnerLoader";

const OtrRegestration = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const [formData, setFormData] = useState({
    aadharNumber: "",
    fullName: "",
    dob: "",
    gender: "",
    caste:"",
    email: "",
    religion: "",
    address: "",
    state: "",
    country: "",
    phoneNumber: "",
    motherName: "",
    fatherName: "",
    fatherOtr: "",
    motherOtr: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    avatarAdharCard: "",
    avatarIncome: "",
    avatarCaste: "",
    avatarPanCard: "",
    avatarResidential: "",
    avatar10thMarksheet: "",
    avatar12thMarksheet: "",
  });
  // console.log(formData);
  
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupPhoneNumber, setPopupPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [isOtpPopup, setIsOtpPopup] = useState(false); // State to handle OTP popup visibility
  const [disableOTR, setDisableOTR] = useState(false);
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false); // Loading state to manage spinner visibility


  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    if (typeof e === "string") {
      e = "+" + e
      setFormData({ ...formData, phoneNumber: e }); // Handle PhoneInput separately
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
    // console.log(formData);
    
  };

  const handleCheckboxChange = (e) => {
    setDisableOTR(e.target.checked);
  };

  const handleFetch = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleGenerateOtp = async(e) => {
    e.preventDefault();
    if(!formData.aadharNumber || !popupPhoneNumber) {
      return null;
    }
    setLoading(true);
    console.log("Aadhar, phone Number:", formData.aadharNumber, popupPhoneNumber);

    try {
      const response = await dispatch(generateAadharOtp({aadharNumber:formData.aadharNumber}));
      
      if (response?.data?.statusCode === 200) {
          
          setReferenceId(response?.data?.data.reference_id)
          toast.success(response?.data?.message, 'OTP send Successfully'); 
          closePopup();  // Close the phone number popup **before** opening OTP popup
          setIsOtpPopup(true)
          setLoading(false);

      } else {
          const errorMessage = response?.data?.message || "OTP request failed!";
          console.log("Error 1:", errorMessage);
          toast.error(errorMessage, 'error');
      }

    } catch (err) {
        const errorMessage = err.message || "Aadhar OTP generation failed!";
        console.log("Error 2:", errorMessage);
        toast.error(errorMessage, 'error');
        setLoading(false);
    }

    setLoading(false);

  };

  const handleAdharVerification = async(e) => {
    e.preventDefault();

    if(!popupPhoneNumber || !otp || !referenceId) {
      return null;
    }
    setLoading(true);
    // const reference_id ="4245245sdfsrtegf"
    console.log("Aadhar, phone Number pppppp:", referenceId, popupPhoneNumber, otp);

    try {
      const response = await dispatch(verifyAadhar({otp, phoneNumber:popupPhoneNumber, reference_id:referenceId}));
      
      if (response?.data?.statusCode === 200) {          
        toast.success(response?.data?.message, 'Aadhar verify');

        const aadhaarData = response?.data?.data.data;
        // console.log("Aadhaar Data:", aadhaarData);
  
        // ✅ Update form with Aadhaar data
        setFormData((prevState) => ({
          ...prevState,
          fullName: aadhaarData.name,
          dob: aadhaarData.dateOfBirth 
          ? aadhaarData.dateOfBirth.split("-").reverse().join("-") 
          : "",
          state: aadhaarData.address.state,
          country: aadhaarData.address.country || "India",
          address: `${aadhaarData.address.house}, ${aadhaarData.address.locality}, ${aadhaarData.address.district}, ${aadhaarData.address.state} - ${aadhaarData.address.pin}`,
        }));
        setLoading(false);
        // console.log("testing",formData);
        
        
    } else {
          const errorMessage = response?.data?.message;
          console.log("error 1 ", errorMessage);
          toast.error(errorMessage, 'error');
          setLoading(false);
      }

    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Aadhar OTP generatioin failed!';
        console.log("error 2 ", errorMessage);
        toast.error(errorMessage, 'error');
        setLoading(false);
    }

    setOpen(true)
    setIsOtpPopup(false); // Close OTP popup after submitting
  };

  const handleOtrSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Form Data Submitted:", formData);

    try {
      const response = await dispatch(register(formData));
      
      if (response?.data?.success) {
          
          const successMessage = response.data.message ;
          toast.success(successMessage, 'success');
          // clear form
          setLoading(false); 
          nevigate("/")
          
      } else {
          const errorMessage = response?.data?.message || err.message;
          console.log("error 1 ", errorMessage);
          toast.error(errorMessage, 'error');
          setLoading(false); 
      }

    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Regestration failed!';
        console.log("error 2 ", errorMessage);
        toast.error(errorMessage, 'error');
        setLoading(false); 
    }
    
  };

  return (
    <div className="bod" style={{marginBottom:"7rem"}}>
      {loading ? (
          <SpinnerLoader /> // Show spinner if loading is true
      ) : (
      <div className="form-container">
        <header className="form-header">
          <div id="auth-account">
            <img src={logo} className="logoDas" alt="Logo" />
          </div>
          <h1 style={{fontSize:"2rem", marginBottom:"1rem"}}>OTR User Registration Form</h1>
        </header>

        <form onSubmit={handleOtrSubmit}>
          <fieldset>
            <div style={{padding:"1rem"}}>
              <legend>Personal Details</legend>
              
              <div className="input-group">
                <label htmlFor="aadharNumber" style={{marginRight:"1rem", marginTop:".5rem"}}>Aadhar Number:</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleChange}
                    required
                    maxLength="12"
                    placeholder="Enter your Aadhar Number"
                  />
                  {/* Fetch button is disabled if Aadhar number is empty */}
                  <button 
                  className="btnFt"
                    type="button"
                    onClick={handleFetch}
                    disabled={!formData.aadharNumber}
                    style={{ backgroundColor: !formData.aadharNumber ? "gray" : "#007bff" }}
                  >
                    Fetch
                  </button>
                </div>
              </div>

              {open ? 
                <div>
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="name">Name :</label>
                      <input
                        type="text"
                        id="name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Name"
                        disabled
                        style={{backgroundColor:"lightgray"}}
                      />
  
                    </div>
  
                    <div className="input-container">
                      <PhoneInput
                        country={"in"} // Default country (India)
                        onlyCountries={["in"]} 
                        name="phoneNumber"
                        id="phoneNumber"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="email">Email ID:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Email ID"
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="caste">Caste:</label>
                      <select
                        id="caste"
                        name="caste"
                        value={formData.caste}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="gender">Gender:</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="motherName">Mother Name:</label>
                      <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        placeholder="* Enter your Mother Name"
                        required
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="fatherName">Father Name:</label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder="* Enter your Father Name"
                        required
                      >
                      </input>
                    </div>
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="religion">Religion:</label>
                      <input
                        type="text"
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Religion"
                      />
                    </div>
  
                    <div className="input-container">
                      <label htmlFor="state">State:</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        disabled
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="* Enter your State "
                        style={{backgroundColor:"lightgray"}}
                      >
                      </input>
                    </div>
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="avatar">*Profile Image:</label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
                        required
                      />
                      
                    </div>
  
                    <div className="input-container">
                      <label htmlFor="country">Country:</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        disabled
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="* Enter your Country"
                        style={{backgroundColor:"lightgray"}}                   
                      >
                      </input>
                    </div>
                  </div>
  
                  <div className="input-container">
                    <label htmlFor="address">Pernmanent Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="* Enter your address"
                      
                    />
                  </div>
                </div>
              : ""}
             
            </div>
          </fieldset>
          
          {open ? 
            <div>
              <fieldset>
                <div style={{padding:"1rem"}}>
                  <legend>OTR Details</legend>
                  <h9>(* Enter at least one OTR Number) </h9>
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="fatherOtr">Father OTR NUMBER :</label>
                      <input
                        type="text"
                        id="fatherOtr"
                        name="fatherOtr"
                        value={formData.fatherOtr}
                        onChange={handleChange}
                        disabled={disableOTR}
                        placeholder="Enter your Father OTR"
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="motherOtr">Mother OTR NUMBER:</label>
                      <input
                        type="text"
                        id="motherOtr"
                        name="motherOtr"
                        value={formData.motherOtr}
                        onChange={handleChange}
                        disabled={disableOTR}
                        placeholder="Enter your Mother OTR"
                      />
                    </div>
                  </div>
  
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={disableOTR}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      If Father and Mother are not Deceased
                    </label>
                  </div>
                </div>
              </fieldset>
              <br/>
              <fieldset>
                <div style={{padding:"1rem"}}>
                  <legend>Document Uploads</legend>
  
                  <div className="input-container">
                    <label htmlFor="avatarAdharCard">*Aadhar Card:</label>
                    <input
                      type="file"
                      id="avatarAdharCard"
                      name="avatarAdharCard"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="avatarCaste">Caste Certificate</label>
                      <input
                        type="file"
                        id="avatarCaste"
                        name="avatarCaste"
                        onChange={handleFileChange}
                      />
                    </div>
  
                    <div className="input-container">
                      <label htmlFor="avatarIncome">Income Certificate</label>
                      <input
                        type="file"
                        id="avatarIncome"
                        name="avatarIncome"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="avatar10thMarksheet">10th Marksheet</label>
                      <input
                        type="file"
                        id="avatar10thMarksheet"
                        name="avatar10thMarksheet"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="avatar12thMarksheet">12th Marksheet</label>
                      <input
                        type="file"
                        id="avatar12thMarksheet"
                        name="avatar12thMarksheet"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
  
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="avatarPanCard">Pan Card</label>
                      <input
                        type="file"
                        id="avatarPanCard"
                        name="avatarPanCard"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="avatarResidential">Residential Certificate</label>
                      <input
                        type="file"
                        id="avatarResidential"
                        name="avatarResidential"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
  
                  <h9>(* Upload file maximum number of file )</h9>
                </div>
              </fieldset>
              <br/>
              <fieldset>
                <div style={{padding:"1rem"}}>
                  <legend>Set Security Key</legend>
                  <div className="input-row">
                    <div className="input-container">
                      <label htmlFor="password">Password :</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter your Password"
                      />
                    </div>
                    <div className="input-container">
                      <label htmlFor="confirmPassword">Confirm Password :</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Enter your Confirm Password"
                      />
                    </div>
                  </div>
                  <button className="btn2" type="submit">
                  {disableOTR ? "Register to Officer" : "Submit"}
              </button>
                </div>
                
              </fieldset>
              {/* <button type="submit">Submit</button> */}

            </div>
          : ""}
        </form>

        {/* Popup for Phone Number Entry */}
        {isPopupVisible && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <p>Enter Aadhar Linked Mobile Number:</p>
              <form onSubmit={handleGenerateOtp}>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={popupPhoneNumber}
                  onChange={ (e) => setPopupPhoneNumber(e.target.value)}
                  maxLength="10"
                  minLength="10"
                  placeholder="Enter your phone number"
                  required // Now "required" will work
                />
                <button type="submit" className="btnFt">Generate OTP</button>
              </form>
            </div>
          </div>
        )}

        {/* OTP Popup after Form Submit */}
        {isOtpPopup && (
          <div className="popup-overlay">
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <p>Enter OTP sent to your Mobile Number:</p>
              <form onSubmit={handleAdharVerification}>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter Aadhar otp"
                  required // Now "required" will work
                />
                <button type="submit" className="btnFt">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
      )};
    </div>
  );
};

export default OtrRegestration;
