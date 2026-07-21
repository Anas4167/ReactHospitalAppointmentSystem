import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Stethoscope,
  Mail,
  Phone,
  User,
  Calendar,
  Clock,
  DollarSign,
  Building,
} from "lucide-react";
import Swal from "sweetalert2";

import DoctorsServices from "../../Services/DoctorsServices";

const DoctorDetails = () => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDoctor = async () => {
    try {
      setLoading(true);

      const response =
        await DoctorsServices.getDoctorById(id);

      setDoctor(response.data);
    } catch (error) {
      Swal.fire(
        "Error",
        "Unable to load doctor",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-20">
        Doctor not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-6 py-12 lg:px-20">

      <div className="max-w-6xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="rounded-3xl overflow-hidden border border-blue-100 shadow-xl md:grid md:grid-cols-2">

          {/* Left */}

          <div className="bg-blue-50 flex flex-col justify-center items-center p-10">

            <div className="h-36 w-36 rounded-full bg-blue-600 flex items-center justify-center">

              <Stethoscope className="h-20 w-20 text-white" />

            </div>

            <h2 className="mt-8 text-3xl font-bold text-blue-900">
              Dr. {doctor.doctorName}
            </h2>

            <p className="mt-2 text-blue-600 font-semibold">
              {doctor.specialization}
            </p>

          </div>

          {/* Right */}

          <div className="bg-blue-600 text-white p-10">

            <h2 className="text-3xl font-bold mb-8">
              Doctor Information
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-3">
                <Mail />
                <span>{doctor.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone />
                <span>{doctor.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <User />
                <span>{doctor.gender}</span>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign />
                <span>${doctor.consultationFee}</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar />
                <span>{doctor.availableDay}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock />
                <span>
                  {doctor.startTime} - {doctor.endTime}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Building />
                <span>
                  Department ID: {doctor.departmentId}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DoctorDetails;