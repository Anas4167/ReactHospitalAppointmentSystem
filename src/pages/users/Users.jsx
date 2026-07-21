import { 
  useState,
  useEffect
} from "react";

import {
  Search,
  UserPlus,
  Pencil,
  Trash2,
} from "lucide-react";

import Swal from "sweetalert2";

import UsersServices from "../../services/UsersServices";
import authService from "../../services/authService";

import { ROLE_COLORS } from "../../constants/roles";


const UsersManagement = () => {


  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [roleFilter, setRoleFilter] = useState("All");



  // LOAD USERS

  const fetchData = async()=>{

    setLoading(true);

    try{

      const response = await UsersServices.getAllUsers();


      if(response.data.status){


        const mappedUsers = response.data.data.map(user=>({

          id:user.userId,

          fullName:user.userName,

          email:user.email,

          role:user.role

        }));


        setUsers(mappedUsers);


      }
      else{

        setUsers([]);

        Swal.fire(
          "Error",
          response.data.message,
          "error"
        );

      }


    }
    catch(error){

      console.error(error);

      Swal.fire(
        "Error",
        error.response?.data?.message ||
        "Unable to load users",
        "error"
      );

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchData();

  },[]);


  // CREATE USER

  const handleCreateUser = ()=>{


    Swal.fire({

      title:"Create User",

      html:`

      <input
      id="userName"
      class="swal2-input"
      placeholder="Username"
      />

      <input
      id="email"
      class="swal2-input"
      placeholder="Email"
      />

      <select
      id="role"
      class="swal2-select"
      >

      <option value="Patient">
      Patient
      </option>

      <option value="Doctor">
      Doctor
      </option>

      <option value="Admin">
      Admin
      </option>

      </select>


      <input
      id="password"
      type="password"
      class="swal2-input"
      placeholder="Password"
      />

      `,


      showCancelButton:true,

      confirmButtonText:"Create",


      preConfirm:()=>{


        const userName =
        document.getElementById("userName").value.trim();


        const email =
        document.getElementById("email").value.trim();


        const role =
        document.getElementById("role").value;


        const password =
        document.getElementById("password").value;



        if(!userName || !email || !password){

          Swal.showValidationMessage(
            "All fields are required"
          );

          return false;

        }



        return {

          userName,

          email,

          role,

          passwordHash:password

        };


      }


    })
    .then(async(result)=>{


      if(!result.isConfirmed)

        return;



      try{


        const response =
        await authService.register(
          result.value
        );



        if(response.data.status){


          Swal.fire(
            "Success",
            response.data.message,
            "success"
          );


          fetchData();


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


        Swal.fire(
          "Error",
          error.response?.data?.message ||
          "Unable to create user",
          "error"
        );


      }


    });


  };


  // EDIT USER

  const handleEditUser = (user)=>{


    Swal.fire({

      title:"Update User",

      html:`

      <input
      id="edit-name"
      class="swal2-input"
      value="${user.fullName}"
      />

      <input
      id="edit-email"
      class="swal2-input"
      value="${user.email}"
      />


      <select id="edit-role" class="swal2-select">

      <option ${user.role==="Admin"?"selected":""}>
      Admin
      </option>

      <option ${user.role==="Doctor"?"selected":""}>
      Doctor
      </option>

      <option ${user.role==="Patient"?"selected":""}>
      Patient
      </option>


      </select>

      `,


      showCancelButton:true,


      confirmButtonText:"Update",


      preConfirm:()=>{


        return {


          userId:user.id,


          userName:
          document.getElementById("edit-name").value,


          email:
          document.getElementById("edit-email").value,


          role:
          document.getElementById("edit-role").value,


          passwordHash:"Password1"


        };


      }


    })
    .then(async(result)=>{


      if(!result.isConfirmed)

        return;


      try{


        const response =
        await UsersServices.updateUser(
          result.value
        );


        if(response.data.status){

          Swal.fire(
            "Success",
            response.data.message,
            "success"
          );

          fetchData();

        }


      }
      catch(error){

        Swal.fire(
          "Error",
          "Unable to update user",
          "error"
        );

      }


    });


  };


  // DELETE USER
  const handleDeleteUser = async(id)=>{


    const confirm =
    await Swal.fire({

      title:"Delete user?",

      text:"This action cannot be undone.",

      icon:"warning",

      showCancelButton:true,

      confirmButtonText:"Delete"


    });



    if(!confirm.isConfirmed)

      return;



    try{


      const response =
      await UsersServices.deleteUser(id);



      if(response.data.status){


        Swal.fire(
          "Deleted",
          response.data.message,
          "success"
        );


        fetchData();


      }


    }
    catch(error){


      Swal.fire(
        "Error",
        error.response?.data?.message ||
        "Unable to delete user",
        "error"
      );


    }


  };

  // FILTER USERS

  const filteredUsers = users.filter((user)=>{

    const search =
      searchQuery.toLowerCase();


    const matchSearch =
      user.fullName
      ?.toLowerCase()
      .includes(search)

      ||

      user.email
      ?.toLowerCase()
      .includes(search)

      ||

      user.id
      .toString()
      .includes(search);



    const matchRole =
      roleFilter === "All"
      ||
      user.role === roleFilter;



    return matchSearch && matchRole;


  });


  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="
      flex
      flex-col
      sm:flex-row
      justify-between
      items-start
      sm:items-center
      gap-4
      ">


        <div>

          <h1 className="
          text-2xl
          font-bold
          dark:text-white
          ">

            User Accounts Control

          </h1>


          <p className="
          text-sm
          text-gray-500
          ">

            Manage system users and roles.

          </p>


        </div>



        <button

        onClick={handleCreateUser}

        className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        bg-blue-600
        text-white
        hover:bg-blue-700
        transition
        "

        >

          <UserPlus className="w-4 h-4"/>

          Create User

        </button>


      </div>






      {/* Search + Filter */}


      <div className="
      flex
      flex-col
      md:flex-row
      gap-4
      justify-between
      bg-white
      dark:bg-slate-900
      border
      rounded-2xl
      p-4
      ">



        <div className="
        relative
        w-full
        md:w-96
        ">


          <Search
          className="
          absolute
          left-3
          top-3
          w-4
          h-4
          text-gray-400
          "
          />


          <input

          value={searchQuery}

          onChange={(e)=>
            setSearchQuery(e.target.value)
          }


          placeholder="Search users..."


          className="
          w-full
          pl-10
          py-2
          rounded-xl
          border
          dark:bg-slate-800
          "
          />


        </div>





        <div className="flex gap-2 flex-wrap">


        {
          [
            "All",
            "Admin",
            "Doctor",
            "Patient"

          ].map(role=>(


            <button

            key={role}

            onClick={()=>
              setRoleFilter(role)
            }


            className={`

            px-3
            py-2
            rounded-xl
            text-sm
            font-semibold


            ${
              roleFilter===role

              ?

              "bg-blue-600 text-white"

              :

              "bg-gray-100 dark:bg-slate-700"

            }

            `}


            >

              {role}

            </button>


          ))
        }


        </div>



      </div>








      {/* TABLE */}


      <div className="
      bg-white
      dark:bg-slate-900
      rounded-2xl
      border
      overflow-hidden
      ">


      {
        loading ?


        <div className="
        p-10
        text-center
        ">

          Loading users...

        </div>



        :


        filteredUsers.length===0 ?


        <div className="
        p-10
        text-center
        text-gray-500
        ">

          No users found.

        </div>



        :



        <div className="overflow-x-auto">


        <table className="
        w-full
        text-sm
        ">


          <thead>


          <tr className="
          border-b
          text-left
          ">


            <th className="p-4">
              ID
            </th>


            <th className="p-4">
              User
            </th>


            <th className="p-4">
              Role
            </th>


            <th className="p-4">
              Actions
            </th>


          </tr>


          </thead>






          <tbody>


          {
            filteredUsers.map(user=>(


              <tr

              key={user.id}

              className="
              border-b
              hover:bg-blue-50
              dark:hover:bg-slate-800
              transition
              "


              >



                {/* ID */}

                <td className="
                p-4
                font-bold
                ">

                  #{user.id}

                </td>






                {/* USER */}


                <td className="p-4">


                  <div className="
                  flex
                  items-center
                  gap-3
                  ">


                    <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-100
                    text-blue-700
                    flex
                    items-center
                    justify-center
                    font-bold
                    ">

                      {
                        user.fullName
                        ?.charAt(0)
                        .toUpperCase()
                      }

                    </div>



                    <div>

                      <p className="font-bold">

                        {user.fullName}

                      </p>


                      <p className="
                      text-xs
                      text-gray-500
                      ">

                        {user.email}

                      </p>


                    </div>



                  </div>


                </td>






                {/* ROLE */}


                <td className="p-4">


                  <span

                  className={`

                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-bold


                  ${
                    ROLE_COLORS[user.role]
                    ||
                    "bg-gray-100 text-gray-700"
                  }


                  `}


                  >

                    {user.role}


                  </span>


                </td>







                {/* ACTIONS */}


                <td className="
                p-4
                flex
                gap-2
                ">



                  <button

                  onClick={()=>
                    handleEditUser(user)
                  }


                  className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  bg-yellow-100
                  text-yellow-700
                  hover:bg-yellow-200
                  "

                  >

                    <Pencil className="w-4 h-4"/>

                    Edit

                  </button>






                  <button

                  onClick={()=>
                    handleDeleteUser(user.id)
                  }


                  className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  bg-red-100
                  text-red-700
                  hover:bg-red-200
                  "

                  >

                    <Trash2 className="w-4 h-4"/>

                    Delete

                  </button>



                </td>





              </tr>


            ))
          }


          </tbody>


        </table>


        </div>


      }



      </div>


    </div>

  );


};


export default UsersManagement;