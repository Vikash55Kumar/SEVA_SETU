import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateResourceAllocation } from "../../actions/employeeAction";
import SpinnerLoader from "../../utility/SpinnerLoader";

const ResourceReallocationDashboard = ({ employeeData }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newDivision, setNewDivision] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 📌 Load divisions from localStorage or use defaults
  const [divisions, setDivisions] = useState(() => {
    const storedDivisions = localStorage.getItem("divisions");
    return storedDivisions
      ? JSON.parse(storedDivisions)
      : [
          { id: 1, name: "North-East", state: "Delhi", pending: 1982, currentEmployees: 5, freeEmployees: 2, requiredEmployees: 1 },
          { id: 2, name: "North", state: "Delhi", pending: 2500, currentEmployees: 0, freeEmployees: 0, requiredEmployees: 1 },
          { id: 3, name: "South-West", state: "Delhi", pending: 1290, currentEmployees: 0, freeEmployees: 0, requiredEmployees: 1 },
          { id: 4, name: "West", state: "Delhi", pending: 4000, currentEmployees: 4, freeEmployees: 2, requiredEmployees: 0 },
        ];
  });
  

  // 🎯 Save divisions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("divisions", JSON.stringify(divisions));
  }, [divisions]);

  // 🎯 Format employee data from props
  useEffect(() => {
    if (employeeData?.length) {
      setEmployees(
        employeeData.map((emp) => ({
          id: emp._id,
          name: emp.fullName,
          email: emp.email,
          avatar: emp.avatar,
          employeeId: emp.employeeId,
          currentDivision: emp.division || "Unassigned",
        }))
      );
    }
  }, [employeeData]);

  // 📊 Compute employee counts dynamically
  useEffect(() => {
    setDivisions((prevDivisions) =>
      prevDivisions.map((division) => ({
        ...division, // Keep `pending` static
        currentEmployees: employees.filter((emp) => emp.currentDivision === division.name).length,
        freeEmployees: Math.max(0, employees.filter((emp) => emp.currentDivision === division.name).length - division.requiredEmployees),
      }))
    );
  }, [employees]);
  

  // 🔄 Open Modal for Reallocation
  const openModal = useCallback((employee) => {
    setSelectedEmployee(employee);
    setNewDivision(employee.currentDivision);
    setShowModal(true);
  }, []);

  // 🚀 Handle Employee Reallocation
  const applyReallocation = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedEmployee || !newDivision || selectedEmployee.currentDivision === newDivision) return;

      setLoading(true);
      try {
        const response = await dispatch(updateResourceAllocation({ employeeId: selectedEmployee.id, newDivision }));

        if (response.statusCode === 200 || response.success === "true") {
          toast.success(response.message || "Resource allocation updated successfully");

          // 🆕 Update employees dynamically
          setEmployees((prev) =>
            prev.map((emp) =>
              emp.id === selectedEmployee.id ? { ...emp, currentDivision: newDivision } : emp
            )
          );

          setShowModal(false);
        }
      } catch (err) {
        toast.error(err || "Resource allocation update failed");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, selectedEmployee, newDivision]
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Employee Reallocation Dashboard</h1>
          <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">Differernt District </h2>
          {/* 📊 Division Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((division) => {
                console.log({division});

            // 🎨 Dynamic color logic
            const bgColor =
              division.currentEmployees < division.requiredEmployees
                ? "bg-red-100 border-l-4 border-red-500" // 🔴 Shortage
                : division.freeEmployees > 0
                ? "bg-yellow-100 border-l-4 border-yellow-500" // 🟡 Extra capacity
                : "bg-green-100 border-l-4 border-green-500"; // 🟢 Sufficient employees

            return (
              <div key={division.id} className={`p-6 rounded-lg shadow-md ${bgColor}`}>
                
                <h2 className="text-lg font-semibold text-gray-700">{division.name} District</h2>
                <p className="font-semibold text-red-600">📜 Pending Certificates: {division.pending}</p>
                <p className="text-blue-600">👷 Current Employees: {division.currentEmployees}</p>
                <p className={`font-semibold ${division.currentEmployees < division.requiredEmployees ? "text-red-600" : "text-green-600"}`}>
                  🔹 Required Employees: {division.requiredEmployees}
                </p>
                <p className={`font-semibold ${division.freeEmployees > 0 ? "text-yellow-600" : "text-gray-600"}`}>
                  🆓 Free Employees: {division.freeEmployees}
                </p>
              </div>
            );
          })}

          </div>

          {/* 👷 Employee List */}
          <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-4">Employees</h2>
          <div className="flex justify-center lg:grid-cols-4 gap-6">
            {employees.map((employee) => (
              <div key={employee.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
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

          {/* 🔄 Reallocation Modal */}
          {showModal && (
            <Dialog open={showModal} onClose={() => setShowModal(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                  <button className="bg-gray-400 text-white px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={applyReallocation}>
                    Apply Changes
                  </button>
                </div>
              </div>
            </Dialog>
          )}
        </>
      )}
    </div>
  );
};

export default ResourceReallocationDashboard;
