import { Link } from "react-router-dom";
import {
  UserCircle,
  KeyRound,
  Mail,
  Shield,
  User,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { ROLE_COLORS } from "../../constants/roles";


const Profile = () => {

  const { user } = useAuth();


  return (

    <div className="space-y-6">


      {/* Header */}

      <div>

        <h1 className="
        text-2xl
        font-bold
        tracking-tight
        text-on-surface
        dark:text-white
        ">
          My Profile
        </h1>


        <p className="
        text-sm
        text-on-surface-variant
        ">
          Manage your account information and security.
        </p>

      </div>





      <div className="
      grid
      gap-6
      lg:grid-cols-3
      ">



        {/* Profile Card */}


        <div className="
        rounded-2xl
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        shadow-md
        p-6
        ">


          <div className="
          flex
          flex-col
          items-center
          text-center
          ">


            <div className="
            h-20
            w-20
            rounded-full
            bg-blue-100
            dark:bg-blue-500/20
            flex
            items-center
            justify-center
            ">

              <UserCircle
                className="
                h-10
                w-10
                text-blue-600
                "
              />

            </div>



            <h2 className="
            mt-4
            text-lg
            font-bold
            text-slate-900
            dark:text-white
            ">

              {user?.userName || "User"}

            </h2>




            <span
              className={`
              mt-3
              px-3
              py-1
              rounded-full
              text-xs
              font-bold
              border

              ${
                ROLE_COLORS[user?.role]
                ||
                "bg-gray-100 text-gray-700 border-gray-200"
              }
              `}
            >

              {user?.role || "User"}

            </span>




            <p className="
            mt-3
            text-sm
            text-gray-500
            ">

              User ID: {user?.userId || "—"}

            </p>


          </div>


        </div>









        {/* Details */}


        <div className="
        space-y-6
        lg:col-span-2
        ">



          {/* Account Information */}


          <div className="
          rounded-2xl
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          shadow-md
          p-6
          ">


            <h3 className="
            text-sm
            font-bold
            uppercase
            tracking-wider
            text-gray-400
            ">

              Account Details

            </h3>





            <div className="
            mt-5
            space-y-5
            ">



              <div className="
              flex
              items-center
              gap-4
              ">


                <div className="
                p-3
                rounded-xl
                bg-blue-100
                dark:bg-blue-500/20
                ">

                  <User className="
                  h-5
                  w-5
                  text-blue-600
                  "/>

                </div>



                <div>

                  <p className="
                  text-xs
                  text-gray-400
                  ">
                    Username
                  </p>


                  <p className="
                  font-semibold
                  dark:text-white
                  ">

                    {user?.UserName || "—"}

                  </p>


                </div>


              </div>


              <div className="
              flex
              items-center
              gap-4
              ">


                <div className="
                p-3
                rounded-xl
                bg-green-100
                dark:bg-green-500/20
                ">


                  <Mail className="
                  h-5
                  w-5
                  text-green-600
                  "/>


                </div>



                <div>


                  <p className="
                  text-xs
                  text-gray-400
                  ">
                    Email
                  </p>


                  <p className="
                  font-semibold
                  dark:text-white
                  ">

                    {user?.email || "—"}

                  </p>


                </div>


              </div>


              <div className="
              flex
              items-center
              gap-4
              ">


                <div className="
                p-3
                rounded-xl
                bg-purple-100
                dark:bg-purple-500/20
                ">


                  <Shield className="
                  h-5
                  w-5
                  text-purple-600
                  "/>


                </div>



                <div>


                  <p className="
                  text-xs
                  text-gray-400
                  ">
                    Role
                  </p>


                  <p className="
                  font-semibold
                  dark:text-white
                  ">

                    {user?.role || "—"}

                  </p>


                </div>


              </div>



            </div>



          </div>









          {/* Security */}


          <div className="
          rounded-2xl
          bg-white
          dark:bg-slate-900
          border
          border-slate-200
          dark:border-slate-800
          shadow-md
          p-6
          ">



            <h3 className="
            text-sm
            font-bold
            uppercase
            tracking-wider
            text-gray-400
            ">

              Security

            </h3>



            <p className="
            mt-2
            text-sm
            text-gray-500
            ">

              Change your password regularly to keep your account secure.

            </p>





            <Link
              to="/change-password"
              className="
              mt-5
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-blue-700
              text-white
              hover:bg-blue-800
              transition
              "
            >

              <KeyRound className="w-4 h-4"/>

              Change Password

            </Link>



          </div>




        </div>



      </div>



    </div>

  );

};


export default Profile;