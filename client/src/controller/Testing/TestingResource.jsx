import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import JoyzChatbot from "./Testing2";

const ResourceReallocationDashboard = ({ employeeData, reportData }) => {
  const [divisions, setDivisions] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Format and set report data into divisions
    if (reportData?.length) {
      const formattedDivisions = reportData.map((report) => ({
        id: report._id,
        name: report.district,
        state: report.state,
        totalForms: report.totalForms,
        pendingForms: report.pendingForms,
        processedForms: report.processedForms,
        rejectedForms: report.rejectedForms,
        employees: Math.floor(report.totalForms / 15000), // Example: Assign employees dynamically
      }));
      setDivisions(formattedDivisions);
    }

    // Format employee data
    if (employeeData?.length) {
      const formattedEmployees = employeeData.map((emp) => ({
        id: emp._id,
        name: emp.fullName,
        email: emp.email,
        avatar: emp.avatar,
        employeeId: emp.employeeId,
        currentDivision: "North", // Update dynamically from DB later
      }));
      setEmployees(formattedEmployees);
    }
  }, [employeeData, reportData]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newDivision, setNewDivision] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Open Modal
  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setNewDivision(employee.currentDivision);
    setShowModal(true);
  };

  // Apply Reallocation
  const applyReallocation = () => {
    if (!selectedEmployee || !newDivision) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, currentDivision: newDivision } : emp
      )
    );

    setDivisions((prev) =>
      prev.map((div) => {
        if (div.name === selectedEmployee.currentDivision) {
          return { ...div, employees: div.employees - 1 };
        }
        if (div.name === newDivision) {
          return { ...div, employees: div.employees + 1 };
        }
        return div;
      })
    );

    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Employee Reallocation Dashboard
      </h1>

      {/* Division Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {divisions.map((division) => (
          <div
            key={division.id}
            className={`p-6 rounded-lg shadow-md ${
              division.pendingForms > 10000 ? "bg-red-100" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold text-gray-700">{division.name} District</h2>
            <p className="text-gray-600 mt-2">📌 Total Forms: {division.totalForms}</p>
            <p className="text-red-600 font-semibold">⏳ Pending: {division.pendingForms}</p>
            <p className="text-green-600">✅ Processed: {division.processedForms}</p>
            <p className="text-gray-600">❌ Rejected: {division.rejectedForms}</p>
            <p className="text-blue-600">👷 Employees: {division.employees}</p>
          </div>
        ))}
      </div>

      {/* Employee List */}
      <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">Employees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center">
              <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{employee.name}</h2>
                <p className="text-gray-500 text-sm">{employee.email}</p>
                <p className="text-gray-500 text-xs">ID: {employee.employeeId}</p>
              </div>
            </div>
            <p className="text-gray-600 mt-2">📍 Current Division: {employee.currentDivision}</p>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={() => openModal(employee)}
            >
              Reallocate
            </button>
          </div>
        ))}
      </div>

      {/* Reallocation Modal */}
      {showModal && (
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              Reallocate {selectedEmployee.name}
            </Dialog.Title>
            <p className="text-gray-600 mt-2">
              Move <strong>{selectedEmployee.name}</strong> to another division.
            </p>

            <div className="mt-4">
              <label className="block text-gray-700">Select Division</label>
              <select
                className="w-full border rounded-md p-2 mt-1"
                value={newDivision}
                onChange={(e) => setNewDivision(e.target.value)}
              >
                {divisions.map((division) => (
                  <option key={division.name} value={division.name}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={applyReallocation}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </Dialog>
      )}
      {/* <JoyzChatbot /> */}
    </div>
  );
};

export default ResourceReallocationDashboard;
