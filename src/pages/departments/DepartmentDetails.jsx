import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
ArrowLeft,
Building,
Heart,
Brain,
Baby,
Activity,
Accessibility,
Stethoscope,
} from "lucide-react";

import Swal from "sweetalert2";

import DepartmentsServices from "../../Services/DepartmentsServices";

// Get icon based on department name
const getIconComponent = (name = "") => {
const value = name.toLowerCase();

if (value.includes("cardio")) {
return Heart;
}

if (value.includes("neuro")) {
return Brain;
}

if (
value.includes("pediat") ||
value.includes("child")
) {
return Baby;
}

if (value.includes("diagnos")) {
return Activity;
}

if (value.includes("ortho")) {
return Accessibility;
}

return Building;
};

const DepartmentDetails = () => {
const { id } = useParams();

const [department, setDepartment] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// Load Department
const fetchDepartment = async () => {
setLoading(true);


try {
  const response =
    await DepartmentsServices.getDepartmentById(id);

  console.log(
    "Department Response:",
    response
  );

  /*
    DepartmentsServices already returns res.data.

    Example response:

    {
      departmentId: 1,
      departmentName: "Cardiology",
      description: "Heart treatment and care"
    }
  */

  if (response?.data) {
  const departmentData = response.data;

  const mappedDepartment = {
    id: departmentData.departmentId,

    name: departmentData.departmentName,

    description:
      departmentData.description ||
      "Professional healthcare services provided by experienced specialists.",

    icon: getIconComponent(
      departmentData.departmentName
    ),
  };

  setDepartment(mappedDepartment);
} else {
  setDepartment(null);

  setError("Department not found.");
}

} catch (error) {
  console.error(
    "Department Details Error:",
    error.response?.data || error
  );

  setDepartment(null);

  const message =
    error.response?.data?.message ||
    "Unable to load department.";

  setError(message);

  Swal.fire(
    "Error",
    message,
    "error"
  );

} finally {
  setLoading(false);
}

};

useEffect(() => {
fetchDepartment();
}, [id]);

// Loading
if (loading) {
return ( <section className="
     flex
     min-h-[70vh]
     items-center
     justify-center
     bg-white
   ">


    <div className="text-center">

      <div className="
        mx-auto
        h-12
        w-12
        animate-spin
        rounded-full
        border-4
        border-blue-100
        border-t-blue-600
      " />

      <p className="
        mt-5
        text-lg
        font-medium
        text-blue-600
      ">
        Loading department...
      </p>

    </div>

  </section>
);


}

// Error
if (error) {
return ( <section className="
     flex
     min-h-[70vh]
     items-center
     justify-center
     bg-white
     px-6
   ">


    <div className="text-center">

      <p className="
        text-lg
        text-red-600
      ">
        {error}
      </p>

      <Link
        to="/"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >
        <ArrowLeft size={18} />

        Back to Home page
      </Link>

    </div>

  </section>
);

}

// Not Found
if (!department) {
return ( <section className="
     flex
     min-h-[70vh]
     items-center
     justify-center
     bg-white
   ">

    <div className="text-center">

      <p className="
        text-lg
        text-slate-500
      ">
        Department not found.
      </p>

      <Link
        to="/"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-6
          py-3
          text-white
          hover:bg-blue-700
        "
      >
        <ArrowLeft size={18} />

        Back to Home page
      </Link>

    </div>

  </section>
);


}

// Department Icon
const Icon =
department.icon || Building;

return ( <section className="
   min-h-screen
   bg-white
   px-6
   py-12
   lg:px-20
 ">

  <div className="
    mx-auto
    max-w-6xl
  ">


    {/* Back Button */}
    <Link
      to="/"
      className="
        mb-8
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-blue-50
        px-5
        py-3
        text-sm
        font-medium
        text-blue-600
        transition
        hover:bg-blue-100
      "
    >
      <ArrowLeft size={18} />

      Back to Home page
    </Link>


    {/* Department Details Card */}
    <div className="
      overflow-hidden
      rounded-[30px]
      border
      border-blue-100
      bg-white
      shadow-[0_15px_50px_rgba(37,99,235,0.12)]
      md:grid
      md:grid-cols-2
    ">


      {/* Left Side */}
      <div className="
        flex
        min-h-[500px]
        items-center
        justify-center
        bg-blue-50
        p-10
      ">

        <div className="text-center">


          {/* Icon */}
          <div className="
            mx-auto
            flex
            h-36
            w-36
            items-center
            justify-center
            rounded-full
            bg-blue-600
            shadow-xl
          ">

            <Icon
              className="
                h-20
                w-20
                text-white
              "
              strokeWidth={1.5}
            />

          </div>


          <p className="
            mt-8
            text-sm
            font-semibold
            uppercase
            tracking-[3px]
            text-blue-500
          ">
            Healthcare Department
          </p>


          {/* Department Name */}
          <h2 className="
            mt-3
            text-2xl
            font-bold
            text-blue-900
          ">
            {department.name}
          </h2>

        </div>

      </div>


      {/* Right Side */}
      <div className="
        flex
        flex-col
        justify-center
        bg-blue-600
        p-10
        text-white
        md:p-14
      ">


        <p className="
          text-sm
          uppercase
          tracking-[3px]
          text-blue-100
        ">
          Our Department
        </p>


        {/* Department Name */}
        <h1 className="
          mt-4
          text-4xl
          font-bold
          md:text-5xl
        ">
          {department.name}
        </h1>


        <div className="
          my-6
          h-px
          w-full
          bg-white/30
        " />


        {/* Department Description */}
        <p className="
          text-base
          leading-8
          text-blue-50
        ">
          {department.description}
        </p>


        {/* Extra Information */}
        <div className="
          mt-8
          rounded-2xl
          bg-white/10
          p-5
          backdrop-blur-sm
        ">

          <div className="
            flex
            items-center
            gap-4
          ">

            <Stethoscope
              className="
                h-8
                w-8
                text-white
              "
            />


            <div>

              <h3 className="
                text-lg
                font-semibold
              ">
                Professional Medical Care
              </h3>


              <p className="
                mt-1
                text-sm
                text-blue-100
              ">
                Experienced specialists
                dedicated to your health.
              </p>

            </div>

          </div>

        </div>


      </div>

    </div>

  </div>

</section>


);
};

export default DepartmentDetails;
