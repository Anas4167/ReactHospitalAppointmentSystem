import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import {
  Building,
  Search,
  Plus,
  Users,
  Percent,
  Heart,
  Brain,
  Baby,
  Activity,
  Accessibility,
  UserCheck,
  Edit2,
  Trash2
} from "lucide-react";
import Swal from "sweetalert2";
import DepartmentsServices from "../../services/DepartmentsServices";
import DoctorsServices from "../../services/DoctorsServices";


// Icon Helper
const getIconComponent = (name = "") => {
  const value = name.toLowerCase();

  if (value.includes("cardio")) return Heart;
  if (value.includes("neuro")) return Brain;
  if (value.includes("pediat") || value.includes("child")) return Baby;
  if (value.includes("diagnos")) return Activity;
  if (value.includes("ortho")) return Accessibility;

  return Building;
};

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // const totalDepartments = departments.length;



const totalDoctors = departments.reduce(
  (sum, dept) => sum + dept.doctorCount,
  0
);

  // Load Departments
  const fetchData = async () => {
  setLoading(true);

  try {
    const [departmentResponse, doctorResponse] = await Promise.all([
    DepartmentsServices.getAllDepartments(),
    DoctorsServices.getAllDoctors()
]);


console.log(departmentResponse);
console.log(doctorResponse);

if(departmentResponse.status && doctorResponse.status){

    const mappedDepartments =
    departmentResponse.data.map((dept)=>{

        const departmentDoctors =
        doctorResponse.data.filter(
            doctor =>
            doctor.departmentId === dept.departmentId
        );


        return {

            id: dept.departmentId,

            name: dept.departmentName,

            description: dept.description,

            doctors: departmentDoctors,

            doctorCount: departmentDoctors.length,

            icon: getIconComponent(
                dept.departmentName
            ),

            color:
            "bg-blue-100 text-blue-600"

        };

    });


    setDepartments(mappedDepartments);

}
else{

    setDepartments([]);

    Swal.fire(
        "Error",
        departmentResponse.message ||
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
    fetchData();
  }, []);


  // Create Department
  const handleCreateDepartment = () => {
    Swal.fire({
      title: "Add New Department",
      html: `
        <div class="space-y-3 text-left">

          <div>
            <label class="text-xs font-bold text-gray-500 block mb-1">
              Department Name
            </label>
            <input
              id="dept-name"
              class="swal2-input m-0 w-full"
              placeholder="Department Name"
            />
          </div>

          <div>
            <label class="text-xs font-bold text-gray-500 block mb-1">
              Description
            </label>
            <input
              type="description"
              id="dept-description"
              class="swal2-input m-0 w-full"
              placeholder="20"
            />
          </div>

        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Create",
      confirmButtonColor: "#005dac",

      preConfirm: () => {
        const name = document.getElementById("dept-name").value.trim();
        const description = document.getElementById("dept-description").value.trim();
     

        if (!name) {
          Swal.showValidationMessage("Department name is required.");
          return false;
        }

        return {
            departmentName: name,
            description: description,
            };
      },
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const response = await DepartmentsServices.createDepartment(
          result.value
        );

        if (response.status) {

            Swal.fire({
                icon: "success",
                title: "Success",
                text: response.message,
            });

            fetchData();

            } else {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: response.message,
            });

            }
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Unable to create department.",
        });
      }
    });
  };

// Update Department
const handleUpdateDepartment = (dept) => {

  Swal.fire({

    title: "Edit Department",

    html: `

    <input
    id="dept-name"
    class="swal2-input"
    value="${dept.name}"
    />


    <textarea
    id="dept-description"
    class="swal2-textarea"
    >${dept.description}</textarea>

    `,


    showCancelButton:true,

    confirmButtonText:"Update",

    confirmButtonColor:"#005dac",


    preConfirm:()=>{

      const name =
      document.getElementById("dept-name")
      .value.trim();


      const description =
      document.getElementById("dept-description")
      .value.trim();



      if(!name){

        Swal.showValidationMessage(
          "Department name is required"
        );

        return false;
      }


      return {

        departmentId: dept.id,

        departmentName:name,

        description:description

      };

    }


  }).then(async(result)=>{


    if(!result.isConfirmed)
      return;


    try{


      const response =
      await DepartmentsServices.updateDepartment(
        result.value
      );



        if(response.status){

        Swal.fire(
            "Updated!",
            response.message,
            "success"
        );

        fetchData();

        }
        else{

        Swal.fire(
            "Error",
            response.message,
            "error"
        );

        }


    }
    catch(error){

      Swal.fire(
        "Error",
        "Unable to update department",
        "error"
      );

    }


  });

};

// Delete Department

const handleDeleteDepartment = (dept)=>{


Swal.fire({

title:"Delete Department?",

text:`Delete ${dept.name}?`,

icon:"warning",

showCancelButton:true,

confirmButtonColor:"#d33",

confirmButtonText:"Delete"


}).then(async(result)=>{


if(!result.isConfirmed)
return;


try{


const response =
await DepartmentsServices.deleteDepartment(
  dept.id
);






if(response.status){


Swal.fire(
"Deleted!",
response.message,
"success"
);


fetchData();


}
else{


Swal.fire(
"Error",
response.message,
"error"
);


}





}
catch(error){


Swal.fire(
"Error",
"Unable to delete department",
"error"
);


}



});


};

  const filteredDepts = departments.filter(
  (dept) =>
    dept.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()) ||

    dept.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
);
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface dark:text-white">
            Hospital Clinical Departments
          </h1>

          <p className="text-sm text-on-surface-variant dark:text-surface-variant">
            Review hospital departments and their information.
          </p>
        </div>

        <button
          onClick={handleCreateDepartment}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-700 text-white transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>

      </div>

      {/* Search */}
      <div className="bg-white/40 dark:bg-inverse-surface/40 shadow-md
               
                border border-white/20 dark:border-white/10 rounded-2xl p-4">

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />

          <input
            type="text"
            placeholder="Search department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline/20 bg-white dark:bg-on-tertiary-fixed-variant focus:ring-2 focus:ring-primary outline-none"
          />

        </div>

      </div>

      {/* Loading */}
      
    {loading ? (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
            key={i}
            className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
        />
        ))}

    </div>

    ) : filteredDepts.length === 0 ? (

    <div className="text-center py-16 text-on-surface-variant">
        No departments found.
    </div>

    ) : (

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {filteredDepts.map((dept, index) => {

            const Icon = dept.icon || Building;

            return (

              <Motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="
                rounded-2xl
                bg-white
                dark:bg-slate-900
                border
                border-slate-200
                dark:border-slate-800
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                p-6
                "              >
                    {/* Icon */}

                <div className="flex justify-between items-start">

                <div className={`p-3 rounded-xl ${dept.color}`}>
                <Icon className="h-6 w-6"/>
                </div>


                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                ID: {dept.id}
                </span>

                </div>


                {/* Department Name */}

                <h2 className="mt-5 text-lg font-bold">
                {dept.name}
                </h2>


                {/* Description */}

                <p className="mt-2 text-sm text-slate-500">
                {dept.description}
                </p>


                {/* Doctors count */}

                <div className="mt-4 flex items-center gap-2">

                <UserCheck className="w-4 h-4"/>

                <span>
                Doctors: {dept.doctorCount}
                </span>

                </div>
                <div className="mt-5 flex gap-3">


                <button
                onClick={()=>handleUpdateDepartment(dept)}
                className="
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-lg
                bg-blue-100
                text-blue-600
                hover:bg-blue-200
                "
                >

                <Edit2 className="w-4 h-4"/>

                Edit

                </button>



                <button
                onClick={()=>handleDeleteDepartment(dept)}
                className="
                flex
                items-center
                gap-2
                px-3
                py-2
                rounded-lg
                bg-red-100
                text-red-600
                hover:bg-red-200
                "
                >

                <Trash2 className="w-4 h-4"/>

                Delete

                </button>


                </div>


              </Motion.div>

            );

          })}

        </div>

      )}

    </div>
  );
};

export default Departments;