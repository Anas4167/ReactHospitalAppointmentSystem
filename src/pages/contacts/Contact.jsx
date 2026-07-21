import { useEffect, useState } from "react";
import {
  Search,
  Mail,
  Phone,
  User,
  MapPin,
  MessageSquare,
} from "lucide-react";

import Swal from "sweetalert2";

import ContactServices from "../../Services/Contacts";


const Contacts = () => {

  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");


  // Load Contacts

const loadContacts = async () => {

    try {

        setLoading(true);


        const response =
            await ContactServices.getAllContacts();


        console.log(
            "CONTACT RESPONSE:",
            response.data
        );


        if(response.data.status){

            setContacts(response.data.data);

        }
        else{

            setContacts([]);

        }


    } catch(error){

        console.log(
            "CONTACT ERROR:",
            error.response
        );


        Swal.fire(
            "Error",
            "Unable to load contacts",
            "error"
        );


    } finally {

        setLoading(false);

    }

};


  useEffect(() => {

    loadContacts();

  }, []);



  // Filter Contacts

  const filtered = contacts.filter((contact) => {

    const value =
      search.toLowerCase();


    return (

      contact.name
        ?.toLowerCase()
        .includes(value)

      ||

      contact.email
        ?.toLowerCase()
        .includes(value)

      ||

      contact.phoneNumber
        ?.toLowerCase()
        .includes(value)

      ||

      contact.question
        ?.toLowerCase()
        .includes(value)

    );

  });



  return (

    <div className="space-y-6">


      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Contact Messages
        </h1>


        <p className="text-gray-500 dark:text-gray-400">
          View messages submitted by visitors.
        </p>

      </div>



      {/* Search */}

      <div className="relative">


        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />


        <input

          type="text"

          placeholder="Search by name, email or question..."

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"

        />


      </div>




      {/* Contacts Table */}


      <div className="overflow-x-auto rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-700">


        <table className="w-full text-sm">


          <thead className="bg-gray-100 dark:bg-gray-800">


            <tr>


              <th className="p-4 text-left">
                ID
              </th>


              <th className="p-4 text-left">
                Name
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


              <th className="p-4 text-left">
                Question
              </th>


              <th className="p-4 text-left">
                Date
              </th>


            </tr>


          </thead>




          <tbody>


          {loading ? (


            <tr>

              <td
                colSpan="7"
                className="text-center p-10 dark:text-gray-300"
              >
                Loading contacts...
              </td>

            </tr>



          ) : filtered.length === 0 ? (


            <tr>

              <td
                colSpan="7"
                className="text-center p-10 dark:text-gray-300"
              >
                No contact messages found.
              </td>

            </tr>



          ) : (


            filtered.map((contact)=>(


              <tr

                key={contact.contactId}

                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"

              >



                <td className="p-4">
                  #{contact.contactId}
                </td>



                <td className="p-4 font-semibold">

                  <div className="flex items-center gap-2">

                    <User size={16}/>

                    {contact.name}

                  </div>

                </td>



                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <Mail size={16}/>

                    {contact.email}

                  </div>

                </td>




                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <Phone size={16}/>

                    {contact.phoneNumber}

                  </div>

                </td>




                <td className="p-4">

                  <div className="flex items-center gap-2">

                    <MapPin size={16}/>

                    {contact.address}

                  </div>

                </td>




                <td className="p-4 max-w-sm whitespace-normal">

                  <div className="flex gap-2">

                    <MessageSquare size={16}/>

                    {contact.question}

                  </div>

                </td>





                <td className="p-4">


                  {contact.createdDate && (

                    <>
                      <div>

                        {new Date(
                          contact.createdDate
                        ).toLocaleDateString()}

                      </div>


                      <div className="text-xs text-gray-500">

                        {new Date(
                          contact.createdDate
                        ).toLocaleTimeString()}

                      </div>

                    </>

                  )}


                </td>



              </tr>


            ))


          )}



          </tbody>


        </table>


      </div>


    </div>

  );

};


export default Contacts;