import { useRoutes } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";

// Protection
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Booking from "../pages/Booking";
import Contacts from "../pages/contacts/Contact";
import ContactsForm from "../components/ContactsForm";


import DepartmentDetails from "../pages/departments/DepartmentDetails";
import DoctorDetails from "../pages/doctors/DoctorDetails";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChangePassword from "../pages/auth/ChangePassword";

// Private Pages
import Dashboard from "../pages/dashboard/Dashboard";
import Doctors from "../pages/doctors/Doctors";
import Departments from "../pages/departments/Departments";
import Patients from "../pages/patients/Patients";
import Users from "../pages/users/Users";
import Appointments from "../pages/appointments/Appointments";
import Profile from "../pages/profile/Profile";


// Error Pages
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";


function AppRoutes() {

  const routes = useRoutes([

    // PUBLIC ROUTES
    {
      path: "/", element: <PublicLayout />,

      children: [

        { index: true, element: <Home />, },

        { path: "about", element: <About />, },

        { path: "services", element: <Services />, },

        { path: "booking", element: <Booking />, },

        { path: "contactForm", element: <ContactsForm />, },

        { path: "dept/:id", element: <DepartmentDetails />,},

        { path: "doc/:id", element: <DoctorDetails />,},

        { path: "login", element: <Login />, },

        { path: "register", element: <Register />, },

        { path: "forgot-password", element: <ForgotPassword />, },

        { path: "change-password", element: <ChangePassword />, },
      ],
    },


    // PRIVATE ROUTES

    {
      element: (
        <ProtectedRoute>
          <PrivateLayout />
        </ProtectedRoute>
      ),

      children: [

        { path: "/dashboard", element: <Dashboard />, },

        { path: "/departments", element: <Departments />, },

        { path: "/doctors", element: <Doctors />, },

        { path: "/patients", element: <Patients />, },

        { path: "/users", element: <Users />, },

        { path: "/appointments", element: <Appointments />, },

        { path: "/contact", element: <Contacts />, },

        { path: "/profile", element: <Profile />, },
      ],
    },

    // ERROR ROUTES

    { path: "/unauthorized", element: <Unauthorized />, },

    { path: "*", element: <NotFound />, },

  ]);


  return routes;
}


export default AppRoutes;