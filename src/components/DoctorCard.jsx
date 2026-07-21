import { useEffect, useState } from "react";
import { Stethoscope, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DoctorsServices from "../Services/DoctorsServices";

const DoctorsCard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadDoctors = async () => {
    try {
      setLoading(true);

      const response = await DoctorsServices.getAllDoctors();
      const doctorData = response.data;

      if (Array.isArray(doctorData)) {
        setDoctors(doctorData);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error(error);

      setDoctors([]);

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

  return (
    <section className="bg-white px-6 py-16 transition-colors duration-300 dark:bg-slate-950 lg:px-20">
      {/* Heading */}
      <div className="mb-12 text-center">
        <p className="text-lg font-medium text-blue-600">
          Medical Experts
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-blue-900 transition-colors dark:text-white md:text-4xl">
          Meet Our Doctors
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-500 transition-colors dark:text-slate-400">
          Our experienced doctors provide professional healthcare
          services with compassion and excellence.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        </div>
      )}

      {/* Empty */}
      {!loading && doctors.length === 0 && (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400">
          No doctors found.
        </div>
      )}

      {/* Doctors */}
      {!loading && doctors.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.doctorId}
              className="
                overflow-hidden
                rounded-3xl
                border
                border-blue-100
                bg-white
                text-center
                shadow-[0_8px_30px_rgba(37,99,235,0.08)]
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_12px_35px_rgba(37,99,235,0.18)]
                dark:border-slate-800
                dark:bg-slate-900
                dark:shadow-none
              "
            >
              {/* Top */}
              <div className="relative h-28 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow-lg dark:border-slate-900">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pt-12">
                <h3 className="text-xl font-semibold text-blue-900 transition-colors dark:text-white">
                  Dr. {doctor.doctorName}
                </h3>

                <p className="mt-2 text-slate-500 transition-colors dark:text-slate-400">
                  {doctor.specialization}
                </p>
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={() => navigate(`/doc/${doctor.doctorId}`)}
                className="
                  mx-auto
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-2
                  pb-8
                  text-sm
                  font-medium
                  text-blue-600
                  transition-colors
                  hover:text-blue-700
                  dark:text-blue-400
                  dark:hover:text-blue-300
                "
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorsCard;