import api from "../api/axios";
import { ENDPOINTS } from "../constants/api";


const DepartmentsServices = {


getAllDepartments(){

    return api
    .get(ENDPOINTS.DEPARTMENTS.ALL)
    .then(res=>res.data);

},


getDepartmentById(id){

    return api
    .get(ENDPOINTS.DEPARTMENTS.BY_ID(id))
    .then(res=>res.data);

},


createDepartment(data){

    return api
    .post(
        ENDPOINTS.DEPARTMENTS.CREATE,
        data
    )
    .then(res=>res.data);

},


updateDepartment(data){

    return api
    .put(
        ENDPOINTS.DEPARTMENTS.UPDATE,
        data
    )
    .then(res=>res.data);

},


deleteDepartment(id){

    return api
    .delete(
        ENDPOINTS.DEPARTMENTS.DELETE(id)
    )
    .then(res=>res.data);

}


};




export default DepartmentsServices;