import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Register = () => {

const navigate = useNavigate();

const { register } = useAuth();


const [form, setForm] = useState({

    userName:"",
    email:"",
    passwordHash:"",
    role:"Patient"

});


const [errors, setErrors] = useState({});



const handleChange = (e) => {

setForm({

...form,

[e.target.name]: e.target.value

});


// remove error when user starts typing
setErrors({

...errors,

[e.target.name]: ""

});

};




// VALIDATION
const validate = () => {

let newErrors = {};


if(!form.userName.trim()){

newErrors.userName = "Username is required.";

}


if(!form.email.trim()){

newErrors.email = "Email is required.";

}
else if(!/\S+@\S+\.\S+/.test(form.email)){

newErrors.email = "Invalid email format.";

}



if(!form.passwordHash.trim()){

newErrors.passwordHash = "Password is required.";

}
else if(form.passwordHash.length < 6){

newErrors.passwordHash = "Password must be at least 6 characters.";

}



if(!form.role){

newErrors.role = "Role is required.";

}



setErrors(newErrors);


return Object.keys(newErrors).length === 0;

};






const handleSubmit = async(e) => {

e.preventDefault();


if(!validate()){

return;

}


try{

await register(form);

navigate("/login");

}
catch(error){

console.log(error);

}

};






return (

<div className="flex min-h-screen items-center justify-center">


<div className="w-full max-w-md rounded-3xl border p-8">


<h1 className="text-3xl font-bold text-center">
Create Account
</h1>




<form
onSubmit={handleSubmit}
className="mt-6 space-y-4"
>



<div>

<input

name="userName"

placeholder="Full Name"

value={form.userName}

onChange={handleChange}

className="w-full rounded-xl border p-3"

/>


{errors.userName && (

<p className="text-red-500 text-sm mt-1">

{errors.userName}

</p>

)}

</div>





<div>

<input

name="email"

type="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

className="w-full rounded-xl border p-3"

/>


{errors.email && (

<p className="text-red-500 text-sm mt-1">

{errors.email}

</p>

)}

</div>







<div>

<input

name="passwordHash"

type="password"

placeholder="Password"

value={form.passwordHash}

onChange={handleChange}

className="w-full rounded-xl border p-3"

/>


{errors.passwordHash && (

<p className="text-red-500 text-sm mt-1">

{errors.passwordHash}

</p>

)}

</div>








<select

name="role"

value={form.role}

onChange={handleChange}

className="w-full rounded-xl border p-3"

>


<option value="Patient">
Patient
</option>


<option value="Admin">
Admin
</option>


<option value="Doctor">
Doctor
</option>


</select>



{errors.role && (

<p className="text-red-500 text-sm mt-1">

{errors.role}

</p>

)}

<button
  type="button"
  onClick={() => navigate("/login")}
  className="text-blue-600 hover:underline"
 >
 Login
</button>
<button

className="w-full rounded-xl bg-blue-500 text-white py-3"

>

Register

</button>



</form>


</div>


</div>

);


};


export default Register;