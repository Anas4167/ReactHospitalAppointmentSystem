import { useState } from "react";
import { KeyRound } from "lucide-react";
import Swal from "sweetalert2";

import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
    const navigate = useNavigate();


const [form,setForm] = useState({

    oldPassword:"",
    newPassword:""

});


const [loading,setLoading] = useState(false);



const handleChange=(e)=>{

    setForm({

        ...form,

        [e.target.name]:e.target.value

    });

};




const submit = async(e)=>{


e.preventDefault();


if(!form.oldPassword || !form.newPassword){

    Swal.fire(
        "Error",
        "All fields are required",
        "error"
    );

    return;

}



try{


setLoading(true);



const response = await authService.changePassword(form);
navigate("/profile");



if(response.data.status){


    Swal.fire(

        "Success",

        "Password changed successfully",

        "success"

    );


    setForm({

        oldPassword:"",
        newPassword:""

    });


}

else{


    Swal.fire(

        "Error",

        response.data.message,

        "error"

    );

}



}
catch(error){


console.log(error);



Swal.fire(

    "Error",

    error.response?.data?.message 
    ||
    "Password change failed",

    "error"

);



}
finally{


setLoading(false);


}



};



return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-50
dark:bg-gray-900
">


<form

onSubmit={submit}

className="
w-full
max-w-md
rounded-2xl
bg-white
dark:bg-gray-800
p-8
shadow-lg
space-y-5
"


>


<div className="text-center">


<div className="
mx-auto
w-14
h-14
rounded-full
bg-primary/10
flex
items-center
justify-center
">

<KeyRound
className="text-primary"
/>


</div>


<h1 className="
mt-4
text-2xl
font-bold
text-gray-900
dark:text-white
">

Change Password

</h1>


</div>




<input

name="oldPassword"

type="password"

placeholder="Current password"

value={form.oldPassword}

onChange={handleChange}

className="
w-full
rounded-xl
border
p-3
dark:bg-gray-700
dark:text-white
"

/>





<input

name="newPassword"

type="password"

placeholder="New password"

value={form.newPassword}

onChange={handleChange}

className="
w-full
rounded-xl
border
p-3
dark:bg-gray-700
dark:text-white
"

/>

<button
onClick={()=>navigate("/profile")} 
className="mt-5 text-blue-600">
    back to profile
</button>



<button

disabled={loading}

className="
w-full
rounded-xl
bg-blue-500
py-3
text-white
font-semibold
hover:opacity-90
disabled:opacity-50
"


>


{
loading
?
"Changing..."
:
"Change Password"
}


</button>




</form>


</div>


);


};


export default ChangePassword;