import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  Stethoscope,
  Building,
  TrendingUp,
  RefreshCw,
   UserCog,
} from "lucide-react";

import AppointmentsServices from "../../services/AppointmentsServices";
import DoctorsServices from "../../services/DoctorsServices";
import PatientsServices from "../../services/PatientsServices";
import DepartmentsServices from "../../services/DepartmentsServices";
import UsersServices from "../../services/UsersServices";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
    const { role } = useAuth();

  const [stats, setStats] = useState({
    totalAppointments: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalDepartments: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadDashboard = async () => {
    try {
      setLoading(true);

     const [
        appointmentsResponse,
        doctorsResponse,
        patientsResponse,
        departmentsResponse,
        usersResponse,
        ] = await Promise.all([
        AppointmentsServices.getAllAppointments(),
        DoctorsServices.getAllDoctors(),
        PatientsServices.getAllPatients(),
        DepartmentsServices.getAllDepartments(),
        UsersServices.getAllUsers(),
        ]);
        console.log("Appointments:", appointmentsResponse.data);
        console.log("Doctors:", doctorsResponse.data);
        console.log("Patients:", patientsResponse.data);
        console.log("Departments:", departmentsResponse.data);
        console.log("Users Array:", usersResponse.data?.data);

        // const appointments = appointmentsResponse.data?.data || [];
        const appointments = appointmentsResponse.status ? appointmentsResponse.data : []
        const doctors = doctorsResponse.status ? doctorsResponse.data : [];
        const patients = patientsResponse.status ? patientsResponse.data : [];
        const departments = departmentsResponse.status ? departmentsResponse.data : [];
        const users = usersResponse.data?.data || [];

        setStats({
        totalAppointments: appointments.length,
        totalDoctors: doctors.length,
        totalPatients: patients.length,
        totalDepartments: departments.length,
        totalUsers: users.length,
        });
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [refreshKey]);

  const refreshDashboard = () => {
    setRefreshKey((prev) => prev + 1);
  };

 const cards = [
    {
    title: "Total Users",
    value: stats.totalUsers,
    icon: UserCog,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800",
    },
  {
    title: "Total Appointments",
    value: stats.totalAppointments,
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    title: "Total Doctors",
    value: stats.totalDoctors,
    icon: Stethoscope,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    title: "Total Patients",
    value: stats.totalPatients,
    icon: Users,
    color: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800",
  },
  {
    title: "Departments",
    value: stats.totalDepartments,
    icon: Building,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
  },
];

if (role === "Patient" || role === "Doctor" ) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
        Welcome
      </h1>

      <p className="mt-3 text-slate-500 dark:text-slate-400">
        Please use your profile to manage your account.
      </p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6 transition-colors duration-300">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Hospital Dashboard
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
            Overview of your hospital statistics.
            </p>
        </div>

        <button
        onClick={refreshDashboard}
        className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 font-semibold text-white shadow-lg transition-all"
        >
        <RefreshCw
            className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
        />
        Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
            className={`
            rounded-2xl
            border
            ${card.border}
            bg-white
            dark:bg-slate-900
            shadow-md
            dark:shadow-black/30
            hover:shadow-xl
            transition-all
            duration-300
            p-6
            `}            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {card.title}
                    </p>

                  <h2 className="mt-4 text-5xl font-bold text-slate-900 dark:text-white">
                    {loading ? "..." : card.value}
                    </h2>

                 <div className="mt-5 flex items-center gap-2 text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">
                    Live Statistics
                </span>
                </div>
                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.color}`}
                >
                  <Icon className="h-8 w-8" />
                </div>
              </div>
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;