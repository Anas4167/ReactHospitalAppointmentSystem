import api from "../api/axios";
import { ENDPOINTS } from "../constants/api";


const UsersServices = {

    getAllUsers(){
        return api.get(
            ENDPOINTS.USERS.ALL
        );
    },


    getUserById(id){
        return api.get(
            ENDPOINTS.USERS.BY_ID(id)
        );
    },


    updateUser(data){
        return api.put(
            ENDPOINTS.USERS.UPDATE,
            data
        );
    },


    deleteUser(id){
        return api.delete(
            ENDPOINTS.USERS.DELETE(id)
        );
    }

};


export default UsersServices;