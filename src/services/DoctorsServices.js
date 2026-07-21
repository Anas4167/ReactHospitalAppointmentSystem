import api from "../api/axios";
import { ENDPOINTS } from "../constants/api";


const DoctorsServices={


getAllDoctors(){
return api.get(
ENDPOINTS.DOCTORS.ALL
)
.then(res=>res.data);
},

  getDoctorById(id) {
    return api.get(
      ENDPOINTS.DOCTORS.BY_ID(id)
    ).then(res => res.data);
  },

createDoctor(data){

return api.post(
ENDPOINTS.DOCTORS.CREATE,
data
)
.then(res=>res.data);

},


updateDoctor(data){

return api.put(
ENDPOINTS.DOCTORS.UPDATE,
data
)
.then(res=>res.data);

},


deleteDoctor(id){

return api.delete(
ENDPOINTS.DOCTORS.DELETE(id)
)
.then(res=>res.data);

}


};

export default DoctorsServices;