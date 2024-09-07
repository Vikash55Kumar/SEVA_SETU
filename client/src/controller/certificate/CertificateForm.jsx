import React, { useState } from 'react';
import './CertificateForm.css';

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    parentName: '',
    dob: '',
    gender: '',
    address: '',
    contactNumber: '',
    email: '',
    casteName: '',
    subCaste: '',
    religion: '',
    parentCasteCert: null,
    familyIncome: '',
    occupation: '',
    residenceProof: null,
    birthCert: null,
    schoolCert: null,
    incomeCert: null,
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="container2">
      <h1>Caste Certificate Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="Castform-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder='* Name'
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="parentName">Father's/Mother's/Guardian's Name</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            placeholder="* Fathers/Mother's/Guardian's Name"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="Castform-group">
          <label htmlFor="address">Residential Address</label>
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder='* Enter Residential Address'
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="Castform-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
             placeholder='* Enter Contact Number'
            value={formData.contactNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="email">Email ID (optional)</label>
          <input
            type="email"
            id="email"
            name="email"
             placeholder='Enter Email Id'
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="casteName">Caste/Community Name</label>
          <input
            type="text"
            id="casteName"
            name="casteName"
             placeholder='* Enter Cast Name'
            value={formData.casteName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="subCaste">Sub-caste (if applicable)</label>
          <input
            type="text"
            id="subCaste"
            name="subCaste"
             placeholder='Enter  Sub-Cast'
            value={formData.subCaste}
            onChange={handleChange}
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="religion">Religion</label>
          <input
            type="text"
            id="religion"
            name="religion"
             placeholder='* Enter Your Religion'
            value={formData.religion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="familyIncome">Annual Family Income</label>
          <input
            type="number"
            id="familyIncome"
            name="familyIncome"
             placeholder='* Enter Family Income'
            value={formData.familyIncome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="occupation">Occupation of Applicant/Guardian</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
             placeholder='* Enter Occupation'
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="parentCasteCert">Caste Certificate of Father/Mother/Guardian</label>
          <input
            type="file"
            id="parentCasteCert"
            name="parentCasteCert"
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="residenceProof">Proof of Residence</label>
          <input
            type="file"
            id="residenceProof"
            name="residenceProof"
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="birthCert">Birth Certificate</label>
          <input
            type="file"
            id="birthCert"
            name="birthCert"
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="schoolCert">School Certificate</label>
          <input
            type="file"
            id="schoolCert"
            name="schoolCert"
            onChange={handleChange}
            required
          />
        </div>

        <div className="Castform-group">
          <label htmlFor="incomeCert">Income Certificate (if applicable)</label>
          <input
            type="file"
            id="incomeCert"
            name="incomeCert"
            onChange={handleChange}
          />
        </div>

        <div className="Castform-group2">
          <input
            type="checkbox"
            id="declaration"
            name="declaration"
            checked={formData.declaration}
            onChange={handleChange}
            required
          />
          <label style={{marginLeft:"1rem"}} htmlFor="declaration">I hereby declare that the information provided is true and correct to the best of my knowledge and belief.</label>
        </div>

        <input type="submit" value="Submit Application" />
      </form>
    </div>
  );
}
