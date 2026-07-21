import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



const Login = () => {


    const navigate = useNavigate();


    const { login } = useAuth();



    const [form,setForm] = useState({

        email:"",
        password:""

    });





    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };





const handleLogin = async (e) => {

    e.preventDefault();

    try {

        await login(form.email, form.password);

        navigate("/");

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Login failed"
        );

    }

};





return (

<div className="flex min-h-screen items-center justify-center bg-background px-6">


<div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow">


<h1 className="text-3xl font-bold text-center">
Login
</h1>



<form
onSubmit={handleLogin}
className="mt-8 space-y-5"
>


<input

name="email"

type="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

className="w-full rounded-xl border p-3"

/>




<input

name="password"

type="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

className="w-full rounded-xl border p-3"

/>

<button

onClick={()=>navigate("/forgot-password")}

className="mt-5 text-blue-500"

>

Forgot Password?

</button> <br />

<button
onClick={()=>navigate("/register")} 
className="mt-5 text-blue-600">
    register
</button>

<button
type="submit"
className="w-full rounded-xl text-white bg-blue-500 py-3"
>
Login
</button>



</form>

</div>


</div>


);


};


export default Login;