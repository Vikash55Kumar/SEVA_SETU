import { configureStore } from "@reduxjs/toolkit";
import { adminReducer, reportReducer } from "./reducer/adminReducer";
import { employeeReducer, getEmployeeReducer } from "./reducer/employeeReducer";
import userReducer, { getUserReducer } from "./reducer/userReducer";
import { getCertificateReducer } from "./reducer/certificateReportReducer";

const store = configureStore ({
    reducer : {
        user:userReducer,
        userDetail:getUserReducer,
        employee:employeeReducer,
        employeeDetail:getEmployeeReducer,
        admin:adminReducer,
        report:reportReducer,
        certificateDetail:getCertificateReducer
    }
})

export default store;

