import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  User,
  Stethoscope,
} from "lucide-react";

import Swal from "sweetalert2";

import DoctorsServices from "../../Services/DoctorsServices";

const Doctors = () => {

  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // Load Doctors

  const loadDoctors = async () => {

    try {

      setLoading(true);

      const response =
        await DoctorsServices.getAllDoctors();

      if (response.status) {

        setDoctors(response.data);

      } else {

        setDoctors([]);

      }

    } catch {

      Swal.fire(
        "Error",
        "Unable to load doctors",
        "error"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDoctors();

  }, []);

  // Create Doctor

  const createDoctor = async () => {

    const { value: formValues } = await Swal.fire({

      title: "Add Doctor",

      html: `

          <input
          id="doctorName"
          class="swal2-input"
          placeholder="Doctor Name"
          />

          <input
          id="email"
          type="email"
          class="swal2-input"
          placeholder="Email"
          />

          <input
          id="phone"
          class="swal2-input"
          placeholder="Phone"
          />

          <select
          id="gender"
          class="swal2-input">

          <option value="">
          Select Gender
          </option>

          <option value="Male">
          Male
          </option>

          <option value="Female">
          Female
          </option>

          </select>

          <input
          id="specialization"
          class="swal2-input"
          placeholder="Specialization"
          />

          <input
          id="consultationFee"
          type="number"
          class="swal2-input"
          placeholder="Consultation Fee"
          />

          <input
          id="availableDay"
          class="swal2-input"
          placeholder="Available Day"
          />

          <input
          id="startTime"
          type="time"
          class="swal2-input"
          />

          <input
          id="endTime"
          type="time"
          class="swal2-input"
          />

          <input
          id="departmentId"
          type="number"
          class="swal2-input"
          placeholder="Department ID"
          />

          `,

      showCancelButton: true,

      confirmButtonText: "Create",

      preConfirm: () => {

        const doctorName =
          document.getElementById("doctorName").value;

        const email =
          document.getElementById("email").value;

        const phone =
          document.getElementById("phone").value;

        const gender =
          document.getElementById("gender").value;

        const specialization =
          document.getElementById("specialization").value;

        const consultationFee =
          document.getElementById("consultationFee").value;

        const availableDay =
          document.getElementById("availableDay").value;

        const startTime =
          document.getElementById("startTime").value;

        const endTime =
          document.getElementById("endTime").value;

        const departmentId =
          document.getElementById("departmentId").value;

        if (
          !doctorName ||
          !email ||
          !phone ||
          !gender ||
          !specialization ||
          !consultationFee ||
          !availableDay ||
          !startTime ||
          !endTime ||
          !departmentId
        ) {

          Swal.showValidationMessage(
            "All fields are required"
          );

          return false;

        }

        return {

          doctorName,

          email,

          phone,

          gender,

          specialization,

          consultationFee:
            Number(consultationFee),

          availableDay,

          startTime:
            startTime + ":00",

          endTime:
            endTime + ":00",

          departmentId:
            Number(departmentId),

        };

      },

    });

    if (!formValues)
      return;

    try {

      // console.log("Doctor Payload:");
      // console.log(formValues);

      const response =
        await DoctorsServices.createDoctor(formValues);

      if (response.status) {

        Swal.fire(
          "Success",
          response.message,
          "success"
        );

        loadDoctors();

      }

    } catch {

      Swal.fire(
        "Error",
        "Unable to create doctor",
        "error"
      );

    }

  };

// Edit Doctor

const editDoctor = async (doctor) => {
  const { value: formValues } = await Swal.fire({
    title: "Edit Doctor",

    html: `
      <input
        id="doctorName"
        class="swal2-input"
        value="${doctor.doctorName}"
        placeholder="Doctor Name"
      />

      <input
        id="email"
        type="email"
        class="swal2-input"
        value="${doctor.email}"
        placeholder="Email"
      />

      <input
        id="phone"
        class="swal2-input"
        value="${doctor.phone}"
        placeholder="Phone"
      />

      <select
        id="gender"
        class="swal2-input"
      >
        <option value="Male" ${
          doctor.gender === "Male" ? "selected" : ""
        }>Male</option>

        <option value="Female" ${
          doctor.gender === "Female" ? "selected" : ""
        }>Female</option>
      </select>

      <input
        id="specialization"
        class="swal2-input"
        value="${doctor.specialization}"
        placeholder="Specialization"
      />

      <input
        id="consultationFee"
        type="number"
        class="swal2-input"
        value="${doctor.consultationFee}"
        placeholder="Consultation Fee"
      />

      <input
        id="availableDay"
        class="swal2-input"
        value="${doctor.availableDay}"
        placeholder="Available Day"
      />

      <input
        id="startTime"
        type="time"
        class="swal2-input"
        value="${doctor.startTime?.substring(0,5) || ""}"
      />

      <input
        id="endTime"
        type="time"
        class="swal2-input"
        value="${doctor.endTime?.substring(0,5) || ""}"
      />

      <input
        id="departmentId"
        type="number"
        class="swal2-input"
        value="${doctor.departmentId}"
        placeholder="Department ID"
      />
    `,

    showCancelButton: true,
    confirmButtonText: "Update",

    preConfirm: () => ({
      doctorId: doctor.doctorId,
      doctorName: document.getElementById("doctorName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
      specialization: document.getElementById("specialization").value,
      consultationFee: Number(
        document.getElementById("consultationFee").value
      ),
      availableDay: document.getElementById("availableDay").value,
      startTime:
        document.getElementById("startTime").value + ":00",
      endTime:
        document.getElementById("endTime").value + ":00",
      departmentId: Number(
        document.getElementById("departmentId").value
      ),
    }),
  });

  if (!formValues) return;

  try {
    const response = await DoctorsServices.updateDoctor(formValues);

    if (response.status) {
      Swal.fire(
        "Updated",
        response.message,
        "success"
      );

      loadDoctors();
    }
  } catch {
    Swal.fire(
      "Error",
      "Unable to update doctor",
      "error"
    );
  }
};

// Delete Doctor

const deleteDoctor = async (id) => {
  const confirm = await Swal.fire({
    title: "Delete Doctor?",
    text: "This action cannot be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
  });

  if (!confirm.isConfirmed) return;

  try {
    const response =
      await DoctorsServices.deleteDoctor(id);

    if (response.status) {
      Swal.fire(
        "Deleted",
        response.message,
        "success"
      );

      loadDoctors();
    }
  } catch {
    Swal.fire(
      "Error",
      "Unable to delete doctor",
      "error"
    );
  }
};


// Filter
const filtered = doctors.filter((doctor) =>
  doctor.doctorName
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  doctor.specialization
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  doctor.email
    .toLowerCase()
    .includes(search.toLowerCase())
);
return (
  <div className="space-y-6">
        {/* Header */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Doctors
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Manage hospital doctors
        </p>
      </div>

      <button
        onClick={createDoctor}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Doctor
      </button>

    </div>

    {/* Search */}
    <div className="relative">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search by doctor, specialization or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
      />

    </div>
          {/* Doctors Table */}
      <div className="overflow-x-auto rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Specialization</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Fee</th>
              <th className="p-4 text-left">Available</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center p-10 dark:text-gray-300"
                >
                  Loading doctors...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center p-10 dark:text-gray-300"
                >
                  No doctors found.
                </td>
              </tr>
            ) : (
              filtered.map((doctor) => (
                <tr
                  key={doctor.doctorId}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-4">
                    #{doctor.doctorId}
                  </td>

                  <td className="p-4 font-semibold">
                    {doctor.doctorName}
                  </td>

                  <td className="p-4">
                    {doctor.gender}
                  </td>

                  <td className="p-4">
                    {doctor.specialization}
                  </td>

                  <td className="p-4">
                    {doctor.email}
                  </td>

                  <td className="p-4">
                    {doctor.phone}
                  </td>

                  <td className="p-4">
                    ${doctor.consultationFee}
                  </td>

                  <td className="p-4">
                    <div>{doctor.availableDay}</div>

                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {doctor.startTime?.substring(0, 5)} -{" "}
                      {doctor.endTime?.substring(0, 5)}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => editDoctor(doctor)}
                        className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => deleteDoctor(doctor.doctorId)}
                        className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Doctors;