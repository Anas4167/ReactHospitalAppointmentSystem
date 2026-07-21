import api from "../api/axios";
import { ENDPOINTS } from "../constants/api";


const PatientsServices = {


    getAllPatients(){

        return api
            .get(ENDPOINTS.PATIENTS.ALL)
            .then(res => res.data);

    },


    getPatientById(id){

        return api
            .get(
                ENDPOINTS.PATIENTS.BY_ID(id)
            )
            .then(res => res.data);

    },


    createPatient(data){

        return api
            .post(
                ENDPOINTS.PATIENTS.CREATE,
                data
            )
            .then(res => res.data);

    },


    updatePatient(data){

        return api
            .put(
                ENDPOINTS.PATIENTS.UPDATE,
                data
            )
            .then(res => res.data);

    },


    deletePatient(id){

        return api
            .delete(
                ENDPOINTS.PATIENTS.DELETE(id)
            )
            .then(res => res.data);

    }


};


export default PatientsServices;