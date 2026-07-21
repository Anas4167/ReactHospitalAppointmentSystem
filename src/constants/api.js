export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API URL =", API_BASE_URL);

export const ENDPOINTS = {

     AUTH: {
        LOGIN: "/Users/login",
        REGISTER: "/Users/register",
        FORGOT_PASSWORD: "/Users/forgot-password",
        CHANGE_PASSWORD: "/Users/change-password",
    },


    USERS: {
        ALL: "/Users/all",
        BY_ID: (id) => `/Users/${id}`,
        UPDATE: "/Users/update",
        DELETE: (id) => `/Users/delete/${id}`,
    },

    DEPARTMENTS: {
    ALL: "/Departments/all",

    BY_ID: (id) => `/Departments/${id}`,

    CREATE: "/Departments/register",

    UPDATE: "/Departments/update",

    DELETE: (id) => `/Departments/delete/${id}`,
   },

   DOCTORS:{
    ALL:"/Doctors/all",
    BY_ID:(id)=>`/Doctors/${id}`,
    CREATE:"/Doctors/register",
    UPDATE:"/Doctors/update",
    DELETE:(id)=>`/Doctors/delete/${id}`
    },

    PATIENTS: {

    ALL: "/Patients/all",
    BY_ID: (id) => `/Patients/${id}`,
    CREATE: "/Patients/register",
    UPDATE: "/Patients/update",
    DELETE: (id) => `/Patients/delete/${id}`
},

    APPOINTMENTS: {
        BOOK: "/Appointments/book",
        ALL: "/Appointments/all",
        BY_ID: (id) => `/Appointments/${id}`,
        UPDATE: "/Appointments/update",
        APPROVE: (id) => `/Appointments/approve/${id}`,
        CANCEL: (id) => `/Appointments/cancel/${id}`,
        COMPLETE: (id) => `/Appointments/complete/${id}`,
    },
    CONTACTS: {

    ALL: "/Contacts/all",

    BY_ID: (id) => `/Contacts/${id}`,

    CREATE: "/Contacts/register",

    DELETE: (id) => `/Contacts/delete/${id}`

},

};