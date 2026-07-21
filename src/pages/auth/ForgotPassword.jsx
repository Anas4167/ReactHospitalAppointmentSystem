import { useState } from "react";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";



const ForgotPassword=()=>{

    const navigate = useNavigate();

const [form,setForm]=useState({

email:"",
newPassword:""

});





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const submit=async(e)=>{


e.preventDefault();


try{


await authService.forgotPassword(form);


alert("Password updated");


}
catch(error){

console.log(error);

}


};





return (

<div className="flex min-h-screen items-center justify-center">


<form
onSubmit={submit}
className="w-full max-w-md border p-8 rounded-2xl"
>


<h1 className="text-2xl font-bold">
Forgot Password
</h1>



<input

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

className="mt-5 w-full border p-3"

/>




<input

name="newPassword"

type="password"

placeholder="New Password"

value={form.newPassword}

onChange={handleChange}

className="mt-3 w-full border p-3"

/>

<button
onClick={()=>navigate("/login")} 
className="mt-5 text-blue-500">
    back to login
</button>


<button

className="mt-5 w-full bg-blue-500 text-white py-3"

>

Reset Password

</button>



</form>


</div>


);


};


export default ForgotPassword;