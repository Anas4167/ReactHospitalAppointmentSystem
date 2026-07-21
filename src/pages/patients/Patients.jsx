import { useEffect, useState } from "react";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Mail,
    Phone,
    User
} from "lucide-react";

import Swal from "sweetalert2";

import PatientsServices from "../../Services/PatientsServices";


const Patients = () => {


    const [patients,setPatients] = useState([]);

    const [loading,setLoading] = useState(true);

    const [search,setSearch] = useState("");

    // Load Patients

    const loadPatients = async()=>{

        try{

            setLoading(true);

            const response =
                await PatientsServices
                .getAllPatients();


            if(response.status){

                setPatients(response.data);

            }


        }
        catch(error){

            Swal.fire(
                "Error",
                "Unable to load patients",
                "error"
            );

        }
        finally{

            setLoading(false);

        }

    };





    useEffect(()=>{

        loadPatients();

    },[]);

    // Create Patient
const handleCreate = async()=>{

const {value:formValues} = await Swal.fire({

title:"Add New Patient",

html:`

<input 
id="patientName"
class="swal2-input"
placeholder="Patient Name"
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
id="dateOfBirth"
type="date"
class="swal2-input"
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



<input
id="address"
class="swal2-input"
placeholder="Address"
/>

`,


showCancelButton:true,


confirmButtonText:"Create",



preConfirm:()=>{


const data={


patientName:
document
.getElementById("patientName")
.value,


gender:
document
.getElementById("gender")
.value,


dateOfBirth:
document
.getElementById("dateOfBirth")
.value,


email:
document
.getElementById("email")
.value,


phone:
document
.getElementById("phone")
.value,


address:
document
.getElementById("address")
.value


};



if(
!data.patientName ||
!data.gender ||
!data.dateOfBirth ||
!data.email ||
!data.phone ||
!data.address
){

Swal.showValidationMessage(
"All fields are required"
);


return false;

}


return data;


}


});



if(!formValues)
return;



try{


const response =
await PatientsServices
.createPatient(formValues);



if(response.status){


Swal.fire(
"Success",
response.message,
"success"
);


loadPatients();


}


}
catch(error){


Swal.fire(
"Error",
"Unable to create patient",
"error"
);


}


};



    // Edit Patient
const handleEdit = async(patient)=>{


const {value:formValues} =
await Swal.fire({


title:"Edit Patient",


html:`

<input 
id="patientName"
class="swal2-input"
value="${patient.patientName}"
/>



<select 
id="gender"
class="swal2-input">


<option value="Male"
${patient.gender==="Male"?"selected":""}>
Male
</option>


<option value="Female"
${patient.gender==="Female"?"selected":""}>
Female
</option>


</select>




<input
id="dateOfBirth"
type="date"
class="swal2-input"
value="${patient.dateOfBirth?.split("T")[0]}"
/>




<input
id="email"
type="email"
class="swal2-input"
value="${patient.email}"
/>




<input
id="phone"
class="swal2-input"
value="${patient.phone}"
/>




<input
id="address"
class="swal2-input"
value="${patient.address}"
/>


`,



showCancelButton:true,


confirmButtonText:"Update",




preConfirm:()=>{


return {


patientId:
patient.patientId,


patientName:
document
.getElementById("patientName")
.value,


gender:
document
.getElementById("gender")
.value,


dateOfBirth:
document
.getElementById("dateOfBirth")
.value,


email:
document
.getElementById("email")
.value,


phone:
document
.getElementById("phone")
.value,


address:
document
.getElementById("address")
.value


};


}


});



if(!formValues)
return;



try{


const response =
await PatientsServices
.updatePatient(formValues);



if(response.status){


Swal.fire(
"Updated",
response.message,
"success"
);


loadPatients();


}



}
catch(error){


Swal.fire(
"Error",
"Unable to update patient",
"error"
);


}


};


    // Delete
    const handleDelete = async(id)=>{


        const confirm =
        await Swal.fire({

            title:"Delete Patient?",

            text:"This action cannot be undone",

            icon:"warning",

            showCancelButton:true,

            confirmButtonText:"Delete"

        });



        if(!confirm.isConfirmed)
            return;



        try{


            const response =
            await PatientsServices
            .deletePatient(id);



            if(response.status){


                Swal.fire(
                    "Deleted",
                    response.message,
                    "success"
                );


                loadPatients();

            }


        }
        catch{

            Swal.fire(
                "Error",
                "Delete failed",
                "error"
            );

        }


    };


    const filteredPatients =
    patients.filter(patient=>

        patient.patientName
        .toLowerCase()
        .includes(
            search.toLowerCase()
        )

    );

return (

<div className="space-y-6">

{/* Header */}

<div className="
flex
flex-col
sm:flex-row
justify-between
gap-4
">


<div>

<h1 className="
text-3xl
font-bold
text-gray-900
dark:text-white
">

Patients

</h1>


<p className="
text-gray-500
dark:text-gray-400
">

Manage hospital patients

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

">

<Plus size={18}/>

Add Patient

</button>



</div>








{/* Search */}


<div className="
relative
">


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

onChange={
e=>setSearch(e.target.value)
}


placeholder="Search patient..."


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







{/* TABLE */}


<div className="
overflow-x-auto

rounded-2xl

bg-white

dark:bg-gray-900

border

dark:border-gray-700

">



<table className="
w-full
text-sm
">


<thead className="
bg-gray-100
dark:bg-gray-800
">

<tr>

<th className="p-4 text-left">
ID
</th>


<th className="p-4 text-left">
Name
</th>


<th className="p-4 text-left">
Gender
</th>


<th className="p-4 text-left">
Date Of Birth
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4 text-left">
Phone
</th>


<th className="p-4 text-left">
Address
</th>


<th className="p-4">
Actions
</th>

</tr>

</thead>





<tbody>

{
loading ? (

<tr>
<td 
colSpan="8"
className="text-center p-10"
>
Loading...
</td>
</tr>


)

:


filteredPatients.map((patient)=>(


<tr

key={patient.patientId}

className="
border-t
dark:border-gray-700
hover:bg-gray-50
dark:hover:bg-gray-800
"


>


<td className="p-4">

#{patient.patientId}

</td>



<td className="p-4 flex items-center gap-3">


<div className="
w-10
h-10
rounded-full
bg-primary
text-white
flex
items-center
justify-center
">

<User size={18}/>

</div>


{patient.patientName}


</td>




<td className="p-4">

{patient.gender}

</td>




<td className="p-4">

{
new Date(
patient.dateOfBirth
)
.toLocaleDateString()
}

</td>





<td className="p-4 ">

<div className="flex gap-2">

<Mail size={20}/>

{patient.email}

</div>

</td>




<td className="p-4">

<div className="flex gap-2">

<Phone size={15}/>

{patient.phone}

</div>

</td>




<td className="p-4">

{patient.address}

</td>





<td className="p-4">

<div className="flex gap-2">


<button

onClick={()=>handleEdit(patient)}

className="
p-2
rounded-lg
bg-blue-500
text-white
">

<Edit size={16}/>

</button>




<button

onClick={()=>handleDelete(patient.patientId)}

className="
p-2
rounded-lg
bg-red-500
text-white
">

<Trash2 size={16}/>

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


export default Patients;