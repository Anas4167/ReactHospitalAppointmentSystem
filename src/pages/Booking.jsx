import { useEffect, useState } from "react";
import {
  CalendarDays,
  FileText,
  Stethoscope,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import DoctorsServices from "../services/DoctorsServices";
import AppointmentsServices from "../services/AppointmentsServices";
import PatientsServices from "../services/PatientsServices";

function Booking() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    reason: "",
    paymentFee: "",
  });

  // Only load data when user is logged in
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    loadPatients();
    loadDoctors();
  }, [isLoggedIn]);

  const loadPatients = async () => {
    try {
      const response =
        await PatientsServices.getAllPatients();

      setPatients(response.data);
    } catch (error) {
      console.error("Unable to load patients:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Unable to load patients",
        "error"
      );
    }
  };

  const loadDoctors = async () => {
    try {
      const response =
        await DoctorsServices.getAllDoctors();

      setDoctors(response.data);
    } catch (error) {
      console.error("Unable to load doctors:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Unable to load doctors",
        "error"
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.patientId ||
      !form.doctorId ||
      !form.appointmentDate ||
      !form.reason ||
      !form.paymentFee
    ) {
      Swal.fire(
        "Validation",
        "Please fill all required fields.",
        "warning"
      );

      return;
    }

    try {
      const payload = {
        patientId: Number(form.patientId),
        doctorId: Number(form.doctorId),
        appointmentDate: form.appointmentDate,
        reason: form.reason,
        paymentFee: Number(form.paymentFee),

        // Automatically set by system
        paymentStatus: "Pending",
        status: "Pending",
      };

      console.log("Sending Appointment:", payload);

      const response =
        await AppointmentsServices.bookAppointment(payload);

      console.log("Backend Response:", response);

      Swal.fire(
        "Success",
        response.message ||
          "Appointment booked successfully",
        "success"
      );

      navigate("/appointments");

    } catch (error) {
      console.error(
        "Booking Error:",
        error.response?.data || error
      );

      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Unable to book appointment",
        "error"
      );
    }
  };

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] px-6 py-20">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-lg dark:border-gray-700 dark:bg-gray-900">

            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Book Appointment
            </h1>

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Please login to book an appointment.
            </p>

            <Link
              to="/login"
              className="inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Login
            </Link>

          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGGED IN - BOOKING FORM
  // ==========================================

  return (
    <div className="min-h-[70vh] px-6 py-20">
      <div className="mx-auto max-w-2xl">

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">

          <h1 className="mb-2 text-3xl font-bold text-blue-600">
            Book Appointment
          </h1>

          <p className="mb-8 text-gray-500 dark:text-gray-400">
            Fill in the form below to request an appointment.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Patient */}
            <div>
              <label className="mb-2 block font-medium text-gray-900 dark:text-white">
                Patient
              </label>

              <select
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map((patient) => (
                  <option
                    key={patient.patientId}
                    value={patient.patientId}
                  >
                    {patient.patientName}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="mb-2 block font-medium text-gray-900 dark:text-white">
                Doctor
              </label>

              <div className="relative">
                <Stethoscope
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <select
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white p-3 pl-10 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">
                    Select Doctor
                  </option>

                  {doctors.map((doctor) => (
                    <option
                      key={doctor.doctorId}
                      value={doctor.doctorId}
                    >
                      {doctor.doctorName} -{" "}
                      {doctor.specialization}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Appointment Date */}
            <div>
              <label className="mb-2 block font-medium text-gray-900 dark:text-white">
                Appointment Date
              </label>

              <div className="relative">
                <CalendarDays
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                  type="datetime-local"
                  name="appointmentDate"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white p-3 pl-10 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="mb-2 block font-medium text-gray-900 dark:text-white">
                Reason
              </label>

              <div className="relative">
                <FileText
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <textarea
                  rows="4"
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Describe your symptoms or reason..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 pl-10 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Payment Fee */}
            <div>
              <label className="mb-2 block font-medium text-gray-900 dark:text-white">
                Payment Fee
              </label>

              <input
                type="number"
                name="paymentFee"
                value={form.paymentFee}
                onChange={handleChange}
                placeholder="Enter the amount you can afford to pay"
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Book Appointment
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;