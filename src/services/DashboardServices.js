import api from "../api/axios";


const DashboardServices = {


    getDashboardStats(){

        return api.get(
            "/Dashboard/stats"
        );

    }


};


export default DashboardServices;