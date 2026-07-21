import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  Stethoscope,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  LogIn,
} from "lucide-react";

import { ModeToggle } from "../components/ModeToggle";
import useAuth from "../hooks/useAuth";
import { ROLE_COLORS } from "../constants/roles";


const Navbar = () => {
  



  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();


  const {
    user,
    role,
    isAuthenticated,
    logout
  } = useAuth();
  console.log("Navbar user:", user);



    const initials = user?.email
        ? user.email.slice(0, 2).toUpperCase()
        : "US";



  const linkClass = (path) =>
    `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-md"
        : "text-foreground hover:bg-accent hover:text-accent-foreground"
    }`;



  const mobileLinkClass = (path) =>
    `flex w-full items-center gap-3 px-6 py-4 transition ${
      location.pathname === path
        ? "bg-primary text-primary-foreground"
        : "hover:bg-accent hover:text-accent-foreground"
    }`;



  const handleLogout = () => {

    logout();

    navigate("/login");

  };



  return (

    <header className="sticky top-0 z-50 border-b border-border bg-background">

      <div className="mx-auto flex h-16 items-center justify-between px-6">


        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 hover:bg-accent md:hidden"
          >
            {
              isOpen
              ? <X className="h-5 w-5" />
              : <Menu className="h-5 w-5" />
            }
          </button>



          <div
          onClick={() => navigate("/")} 
          >
                <p className="text-sm font-bold tracking-tight text-blue-600 dark:text-blue-400">
                HospitalCare
                </p>

                <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                HEALTHCARE PORTAL
                </p>
              </div>


        </div>



        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-2 md:flex">


          <button
            onClick={() => navigate("/")}
            className={linkClass("/")}
          >
            <Home className="h-4 w-4" />
            Home
          </button>



          <button
            onClick={() => navigate("/about")}
            className={linkClass("/about")}
          >
            <Info className="h-4 w-4" />
            About
          </button>



          <button
            onClick={() => navigate("/services")}
            className={linkClass("/services")}
          >
            <Stethoscope className="h-4 w-4" />
            Services
          </button>

          <button
            onClick={() => navigate("/contactForm")}
            className={linkClass("/contactForm")}
          >
            <CalendarDays className="h-4 w-4" />
            Contact Us
          </button>



          <button
            onClick={() => navigate("/booking")}
            className={linkClass("/booking")}
          >
            <CalendarDays className="h-4 w-4" />
            Booking
          </button>


        </nav>




        {/* Right */}

        <div className="flex items-center gap-2">


          {/* Dashboard */}

          {isAuthenticated && (

            <button
              onClick={() => navigate("/dashboard")}
              className={`rounded-xl p-2 transition ${
                location.pathname === "/dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-foreground hover:bg-accent"
              }`}
              title="Dashboard"
            >

              <LayoutDashboard className="h-5 w-5" />

            </button>

          )}





          {/* User */}

          {isAuthenticated ? (

            <>


              <div className="
                hidden sm:flex
                items-center gap-3
                px-1 py-1
                shadow-sm              
                dark:border-white/10
                dark:bg-inverse-surface/40
              ">


                <div className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-2xl
                  bg-primary
                  font-bold
                  text-xl
                  bg-blue-100
                  text-blue-700
                ">
                  {initials}
                </div>

                <div>



                  <span
                    className={`
                      inline-flex
                      rounded-full
                      border
                      px-2
                      py-0.5
                      text-[10px]
                      font-bold
                      uppercase

                      ${
                        ROLE_COLORS[role] ||
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    `}
                  >

                    {role || "Visitor"}

                  </span>


                </div>


              </div>




              {/* Logout */}

              <button
                onClick={handleLogout}
                className="
                  rounded-xl
                  p-2
                  text-red-600
                  transition
                  hover:bg-red-100
                  dark:hover:bg-red-900/30
                "
                title="Logout"
              >

                <LogOut className="h-5 w-5" />

              </button>


            </>


          ) : (


            <button
              onClick={() => navigate("/login")}
              className="
                rounded-xl
                p-2
                text-primary
                transition
                hover:bg-primary/10
              "
              title="Login"
            >

              <LogIn className="h-5 w-5" />

            </button>


          )}



          {/* Dark Mode */}

          <ModeToggle />


        </div>


      </div>





      {/* Mobile Menu */}

      {isOpen && (

        <nav className="border-t border-border bg-background md:hidden">


          <button
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
            className={mobileLinkClass("/")}
          >

            <Home className="h-5 w-5" />

            Home

          </button>



          <button
            onClick={() => {
              navigate("/about");
              setIsOpen(false);
            }}
            className={mobileLinkClass("/about")}
          >

            <Info className="h-5 w-5" />

            About

          </button>



          <button
            onClick={() => {
              navigate("/services");
              setIsOpen(false);
            }}
            className={mobileLinkClass("/services")}
          >

            <Stethoscope className="h-5 w-5" />

            Services

          </button>



          <button
            onClick={() => {
              navigate("/booking");
              setIsOpen(false);
            }}
            className={mobileLinkClass("/booking")}
          >

            <CalendarDays className="h-5 w-5" />

            Booking

          </button>


        </nav>

      )}


    </header>

  );

};


export default Navbar;