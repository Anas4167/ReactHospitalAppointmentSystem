import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  XCircle,
  User,
  Stethoscope,
  CalendarDays,
  DollarSign,
} from "lucide-react";
import Swal from "sweetalert2";

import AppointmentsServices from "../../services/AppointmentsServices";
import PatientsServices from "../../services/PatientsServices";
import DoctorsServices from "../../services/DoctorsServices";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  // Load Data
  const loadAppointments = async () => {
    try {
      setLoading(true);

      const response =
        await AppointmentsServices.getAllAppointments();

      if (response.status) {
        setAppointments(response.data);
      }
    } catch {
      Swal.fire(
        "Error",
        "Unable to load appointments",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadPatients = async () => {
    try {
      const response =
        await PatientsServices.getAllPatients();

      if (response.status) {
        setPatients(response.data);
      }
    } catch {}
  };

  const loadDoctors = async () => {
    try {
      const response =
        await DoctorsServices.getAllDoctors();

      if (response.status) {
        setDoctors(response.data);
      }
    } catch {}
  };

  useEffect(() => {
    loadAppointments();
    loadPatients();
    loadDoctors();
  }, []);

  // Helpers
  const getPatientName = (id) => {
    const patient =
      patients.find((p) => p.patientId === id);

    return patient
      ? patient.patientName
      : `Patient #${id}`;
  };

  const getDoctorName = (id) => {
    const doctor =
      doctors.find((d) => d.doctorId === id);

    return doctor
      ? doctor.doctorName
      : `Doctor #${id}`;
  };

  // Book Appointment
  const handleCreate = async () => {
    const patientOptions = patients
      .map(
        (p) =>
          `<option value="${p.patientId}">
            ${p.patientName}
          </option>`
      )
      .join("");

    const doctorOptions = doctors
      .map(
        (d) =>
          `<option value="${d.doctorId}">
            ${d.doctorName}
          </option>`
      )
      .join("");

    const { value: formValues } =
      await Swal.fire({
        title: "Book Appointment",

        html: `
<select id="patientId" class="swal2-input">
${patientOptions}
</select>

<select id="doctorId" class="swal2-input">
${doctorOptions}
</select>

<input
id="appointmentDate"
type="datetime-local"
class="swal2-input"
/>

<input
id="reason"
class="swal2-input"
placeholder="Reason"
/>

<input
id="paymentFee"
type="number"
class="swal2-input"
placeholder="Payment Fee"
/>

<select
id="paymentStatus"
class="swal2-input">

<option value="Pending">
Pending
</option>

<option value="Paid">
Paid
</option>

</select>

<select
id="status"
class="swal2-input">

<option value="Pending">
Pending
</option>

<option value="Approved">
Approved
</option>

<option value="Completed">
Completed
</option>

</select>
`,

        showCancelButton: true,

        confirmButtonText: "Book",

        preConfirm: () => {
          return {
            patientId: Number(
              document.getElementById("patientId").value
            ),

            doctorId: Number(
              document.getElementById("doctorId").value
            ),

            appointmentDate:
              document.getElementById(
                "appointmentDate"
              ).value,

            reason:
              document.getElementById("reason").value,

            paymentFee: Number(
              document.getElementById("paymentFee")
                .value
            ),

            paymentStatus:
              document.getElementById(
                "paymentStatus"
              ).value,

            status:
              document.getElementById("status")
                .value,
          };
        },
      });

    if (!formValues) return;

    try {
      const response =
        await AppointmentsServices.bookAppointment(
          formValues
        );

      if (response.status) {
        Swal.fire(
          "Success",
          response.message,
          "success"
        );

        loadAppointments();
      }
    } catch {
      Swal.fire(
        "Error",
        "Unable to book appointment",
        "error"
      );
    }
  };

  // Edit Appointment
  const handleEdit = async (appointment) => {
    const patientOptions = patients
      .map(
        (p) =>
          `<option
value="${p.patientId}"
${
  appointment.patientId === p.patientId
    ? "selected"
    : ""
}>
${p.patientName}
</option>`
      )
      .join("");

    const doctorOptions = doctors
      .map(
        (d) =>
          `<option
value="${d.doctorId}"
${
  appointment.doctorId === d.doctorId
    ? "selected"
    : ""
}>
${d.doctorName}
</option>`
      )
      .join("");

    const { value: formValues } =
      await Swal.fire({
        title: "Edit Appointment",

        html: `
<select id="patientId" class="swal2-input">
${patientOptions}
</select>

<select id="doctorId" class="swal2-input">
${doctorOptions}
</select>

<input
id="appointmentDate"
type="datetime-local"
class="swal2-input"
value="${appointment.appointmentDate
  ?.replace(" ", "T")
  ?.substring(0, 16)}"
/>

<input
id="reason"
class="swal2-input"
value="${appointment.reason ?? ""}"
/>

<input
id="paymentFee"
type="number"
class="swal2-input"
value="${appointment.paymentFee}"
/>

<select
id="paymentStatus"
class="swal2-input">

<option
value="Pending"
${
  appointment.paymentStatus === "Pending"
    ? "selected"
    : ""
}>
Pending
</option>

<option
value="Paid"
${
  appointment.paymentStatus === "Paid"
    ? "selected"
    : ""
}>
Paid
</option>

</select>

<select
id="status"
class="swal2-input">

<option value="Pending"
${
  appointment.status === "Pending"
    ? "selected"
    : ""
}>
Pending
</option>

<option value="Approved"
${
  appointment.status === "Approved"
    ? "selected"
    : ""
}>
Approved
</option>

<option value="Completed"
${
  appointment.status === "Completed"
    ? "selected"
    : ""
}>
Completed
</option>

<option value="Cancelled"
${
  appointment.status === "Cancelled"
    ? "selected"
    : ""
}>
Cancelled
</option>

</select>
`,

        showCancelButton: true,

        confirmButtonText: "Update",

        preConfirm: () => ({
          appointmentId:
            appointment.appointmentId,

          patientId: Number(
            document.getElementById("patientId")
              .value
          ),

          doctorId: Number(
            document.getElementById("doctorId")
              .value
          ),

          appointmentDate:
            document.getElementById(
              "appointmentDate"
            ).value,

          reason:
            document.getElementById("reason")
              .value,

          paymentFee: Number(
            document.getElementById("paymentFee")
              .value
          ),

          paymentStatus:
            document.getElementById(
              "paymentStatus"
            ).value,

          status:
            document.getElementById("status")
              .value,
        }),
      });

    if (!formValues) return;

    try {
      const response =
        await AppointmentsServices.updateAppointment(
          formValues
        );

      if (response.status) {
        Swal.fire(
          "Updated",
          response.message,
          "success"
        );

        loadAppointments();
      }
    } catch {
      Swal.fire(
        "Error",
        "Unable to update appointment",
        "error"
      );
    }
  };


  // Cancel Appointment
  const handleCancel = async (id) => {
    const confirm =
      await Swal.fire({
        title: "Cancel Appointment?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cancel Appointment",
      });

    if (!confirm.isConfirmed) return;

    try {
      const response =
        await AppointmentsServices.cancelAppointment(
          id
        );

      if (response.status) {
        Swal.fire(
          "Cancelled",
          response.message,
          "success"
        );

        loadAppointments();
      }
    } catch {
      Swal.fire(
        "Error",
        "Unable to cancel appointment",
        "error"
      );
    }
  };

  // Filter
  const filteredAppointments =
    appointments.filter((appointment) => {
      const patientName =
        getPatientName(
          appointment.patientId
        ).toLowerCase();

      const doctorName =
        getDoctorName(
          appointment.doctorId
        ).toLowerCase();

      return (
        patientName.includes(
          search.toLowerCase()
        ) ||
        doctorName.includes(
          search.toLowerCase()
        ) ||
        appointment.appointmentId
          .toString()
          .includes(search)
      );
    });
      return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

            Appointments

          </h1>

          <p className="text-gray-500 dark:text-gray-400">

            Manage hospital appointments

          </p>

        </div>

        <button
          onClick={handleCreate}
          className="
          flex
          items-center
          gap-2
          px-5
          py-3
          rounded-xl
          bg-blue-700
          text-white
          hover:opacity-90
          transition
          "
        >

          <Plus size={18} />

          Book Appointment

        </button>

      </div>





      {/* Search */}

      <div className="relative">

        <Search
          className="
          absolute
          left-3
          top-3
          text-gray-400
          "
        />

        <input

          value={search}

          onChange={(e) => setSearch(e.target.value)}

          placeholder="Search appointment..."

          className="
          w-full
          pl-10
          py-3
          rounded-xl
          border
          bg-white
          dark:bg-gray-900
          dark:text-white
          dark:border-gray-700
          "

        />

      </div>





      {/* Table */}

      <div
        className="
        overflow-x-auto
        rounded-2xl
        bg-white
        dark:bg-gray-900
        border
        dark:border-gray-700
        "
      >

        <table className="w-full text-sm">

          <thead
            className="
            bg-gray-100
            dark:bg-gray-800
            "
          >

            <tr>

              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Patient
              </th>

              <th className="p-4 text-left">
                Doctor
              </th>

              <th className="p-4 text-left">
                Appointment Date
              </th>

              <th className="p-4 text-left">
                Reason
              </th>

              <th className="p-4 text-left">
                Payment
              </th>

              <th className="p-4 text-left">
                Payment Status
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {

              loading ? (

                <tr>

                  <td
                    colSpan="9"
                    className="text-center p-10"
                  >

                    Loading...

                  </td>

                </tr>

              )

              :

              filteredAppointments.map((appointment) => (

                <tr

                  key={appointment.appointmentId}

                  className="
                  border-t
                  dark:border-gray-700
                  hover:bg-gray-50
                  dark:hover:bg-gray-800
                  "

                >

                  <td className="p-4">

                    #{appointment.appointmentId}

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                        "
                      >

                        <User size={18} />

                      </div>

                      <div>

                        <div className="font-medium">

                          {getPatientName(appointment.patientId)}

                        </div>

                        <div className="text-xs text-gray-500">

                          #{appointment.patientId}

                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                        w-10
                        h-10
                        rounded-full
                        bg-green-600
                        text-white
                        flex
                        items-center
                        justify-center
                        "
                      >

                        <Stethoscope size={18} />

                      </div>

                      <div>

                        <div className="font-medium">

                          {getDoctorName(appointment.doctorId)}

                        </div>

                        <div className="text-xs text-gray-500">

                          #{appointment.doctorId}

                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      <CalendarDays size={16} />

                      {

                        new Date(
                          appointment.appointmentDate
                        ).toLocaleString()

                      }

                    </div>

                  </td>

                  <td className="p-4">

                    {appointment.reason}

                  </td>
                                    <td className="p-4">

                    <div className="flex items-center gap-2">

                      <DollarSign size={16} />

                      ${appointment.paymentFee}

                    </div>

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        appointment.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                      }`}
                    >
                      {appointment.paymentStatus}
                    </span>

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        appointment.status === "Approved"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                          : appointment.status === "Completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : appointment.status === "Cancelled"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                      }`}
                    >
                      {appointment.status}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <button

                        onClick={() => handleEdit(appointment)}

                        className="
                        p-2
                        rounded-lg
                        bg-blue-600
                        text-white
                        hover:bg-blue-700
                        transition
                        "

                      >

                        <Edit size={16} />

                      </button>

                      <button

                        onClick={() =>
                          handleCancel(
                            appointment.appointmentId
                          )
                        }

                        className="
                        p-2
                        rounded-lg
                        bg-red-600
                        text-white
                        hover:bg-red-700
                        transition
                        "

                      >

                        <XCircle size={16} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Appointments;