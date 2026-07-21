import { useState } from "react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare
} from "lucide-react";

import Swal from "sweetalert2";

import ContactServices from "../services/Contacts";


function ContactsForm() {


  const [form, setForm] = useState({

    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    question: ""

  });



  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();



    if (
      !form.name ||
      !form.email ||
      !form.address ||
      !form.phoneNumber ||
      !form.question
    ) {

      Swal.fire(
        "Validation",
        "Please fill all fields.",
        "warning"
      );

      return;

    }



    try {


      const response =
        await ContactServices.createContact(form);



      Swal.fire(
        "Success",
        response.data?.message ||
        "Your message has been sent successfully.",
        "success"
      );



      setForm({

        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        question: ""

      });



    } catch (error) {


      console.error(error);


      Swal.fire(
        "Error",
        error.response?.data?.message ||
        "Unable to send message.",
        "error"
      );

    }

  };




  return (

    <div className="max-w-2xl mx-auto py-20">


      <div
        className="
        bg-white
        dark:bg-gray-900
        rounded-2xl
        shadow
        border
        dark:border-gray-700
        p-8
        "
      >


        <h1 className="text-3xl font-bold mb-2">

          Contact Us

        </h1>


        <p className="text-gray-500 mb-8">

          Have a question? Send us a message and we will get back to you.

        </p>




        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >



          {/* Name */}

          <div>

            <label className="font-medium mb-2 block">
              Full Name
            </label>


            <div className="relative">

              <User
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />


              <input

                type="text"

                name="name"

                value={form.name}

                onChange={handleChange}

                placeholder="Enter your name"

                className="
                w-full
                pl-10
                p-3
                rounded-xl
                border
                dark:bg-gray-800
                dark:border-gray-700
                "
              />

            </div>

          </div>





          {/* Email */}

          <div>

            <label className="font-medium mb-2 block">
              Email
            </label>


            <div className="relative">


              <Mail
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />


              <input

                type="email"

                name="email"

                value={form.email}

                onChange={handleChange}

                placeholder="Enter your email"

                className="
                w-full
                pl-10
                p-3
                rounded-xl
                border
                dark:bg-gray-800
                dark:border-gray-700
                "
              />


            </div>


          </div>





          {/* Phone */}

          <div>

            <label className="font-medium mb-2 block">
              Phone Number
            </label>


            <div className="relative">


              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />


              <input

                type="text"

                name="phoneNumber"

                value={form.phoneNumber}

                onChange={handleChange}

                placeholder="Enter phone number"

                className="
                w-full
                pl-10
                p-3
                rounded-xl
                border
                dark:bg-gray-800
                dark:border-gray-700
                "
              />


            </div>

          </div>







          {/* Address */}

          <div>


            <label className="font-medium mb-2 block">
              Address
            </label>


            <div className="relative">


              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />



              <input

                type="text"

                name="address"

                value={form.address}

                onChange={handleChange}

                placeholder="Enter your address"

                className="
                w-full
                pl-10
                p-3
                rounded-xl
                border
                dark:bg-gray-800
                dark:border-gray-700
                "
              />



            </div>


          </div>







          {/* Question */}


          <div>


            <label className="font-medium mb-2 block">

              Message

            </label>



            <div className="relative">


              <MessageSquare

                className="absolute left-3 top-3 text-gray-400"

                size={18}

              />



              <textarea

                rows="5"

                name="question"

                value={form.question}

                onChange={handleChange}

                placeholder="Write your question..."

                className="
                w-full
                pl-10
                p-3
                rounded-xl
                border
                dark:bg-gray-800
                dark:border-gray-700
                resize-none
                "

              />



            </div>


          </div>





          <button

            type="submit"

            className="
            w-full
            bg-blue-700
            hover:bg-blue-800
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            "

          >

            Send Message

          </button>




        </form>



      </div>


    </div>

  );

}


export default ContactsForm;