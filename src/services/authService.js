import api from "../api/axios";
import { ENDPOINTS } from "../constants/api";


const authService = {

    login(data){
        return api.post(
            ENDPOINTS.AUTH.LOGIN,
            data
        );
    },


    register(data){
        return api.post(
            ENDPOINTS.AUTH.REGISTER,
            data
        );
    },


    forgotPassword(data){
        return api.put(
            ENDPOINTS.AUTH.FORGOT_PASSWORD,
            data
        );
    },


    changePassword(data){
        return api.put(
            ENDPOINTS.AUTH.CHANGE_PASSWORD,
            data
        );
    }

};


export default authService;