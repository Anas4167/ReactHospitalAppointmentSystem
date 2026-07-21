import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building,
  Heart,
  Brain,
  Baby,
  Activity,
  Accessibility,
  ArrowRight,
} from "lucide-react";
import Swal from "sweetalert2";
import DepartmentsServices from "../services/DepartmentsServices";

const getIconComponent = (name = "") => {
  const value = name.toLowerCase();

  if (value.includes("cardio")) return Heart;
  if (value.includes("neuro")) return Brain;
  if (value.includes("pediat") || value.includes("child")) return Baby;
  if (value.includes("diagnos")) return Activity;
  if (value.includes("ortho")) return Accessibility;

  return Building;
};

const HomeDepartments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    setLoading(true);

    try {
      const response = await DepartmentsServices.getAllDepartments();

      const departmentData = response.data;

      if (Array.isArray(departmentData)) {
        setDepartments(
          departmentData.map((dept) => ({
            id: dept.departmentId,
            name: dept.departmentName,
            description:
              dept.description ||
              "Professional healthcare services provided by experienced specialists.",
            icon: getIconComponent(dept.departmentName),
          }))
        );
      } else {
        setDepartments([]);

        Swal.fire(
          "Error",
          "Unable to load departments",
          "error"
        );
      }
    } catch (error) {
      console.error(error);

      setDepartments([]);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text:
          error.response?.data?.message ||
          "Unable to load departments.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 transition-colors duration-300 dark:bg-slate-950 lg:px-20">
      {/* Background */}
      <div className="pointer-events-none absolute left-0 top-0 opacity-30">
        <div className="h-32 w-32 rounded-full bg-blue-100 blur-3xl dark:bg-blue-900/20" />
      </div>

      {/* Header */}
      <div className="relative mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-lg font-medium text-blue-600">
          Services
        </p>

        <h2 className="text-3xl font-semibold text-blue-900 transition-colors dark:text-white md:text-4xl">
          Our Healthcare Services
        </h2>

        <p className="mt-4 text-sm leading-6 text-slate-500 transition-colors dark:text-slate-400 md:text-base">
          We provide high-quality healthcare services delivered by
          experienced medical professionals using modern facilities
          and patient-centered care.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        </div>
      )}

      {/* Empty */}
      {!loading && departments.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No departments found.
          </p>
        </div>
      )}

      {/* Cards */}
      {!loading && departments.length > 0 && (
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department) => {
            const Icon = department.icon || Building;

            return (
              <div
                key={department.id}
                className="
                  group
                  rounded-2xl
                  border
                  border-blue-100
                  bg-white
                  p-8
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
                {/* Icon */}
                <div className="mb-6">
                  <Icon
                    className="
                      h-12
                      w-12
                      stroke-[1.5]
                      text-blue-600
                      transition-colors
                      duration-300
                      group-hover:text-blue-700
                      dark:text-blue-400
                      dark:group-hover:text-blue-300
                    "
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-blue-900 transition-colors dark:text-white">
                  {department.name}
                </h3>

                {/* Description */}
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500 transition-colors dark:text-slate-400">
                  {department.description}
                </p>

                {/* Button */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/dept/${department.id}`)
                  }
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
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
            );
          })}
        </div>
      )}
    </section>
  );
};

export default HomeDepartments;