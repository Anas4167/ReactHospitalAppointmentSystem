import api from "../api/axios";
import { ENDPOINTS } from "../constants/api";

const AppointmentsServices = {

    getAllAppointments() {

        return api
            .get(ENDPOINTS.APPOINTMENTS.ALL)
            .then(res => res.data);

    },

    getAppointmentById(id) {

        return api
            .get(ENDPOINTS.APPOINTMENTS.BY_ID(id))
            .then(res => res.data);

    },

    bookAppointment(data) {

        return api
            .post(ENDPOINTS.APPOINTMENTS.BOOK, data)
            .then(res => res.data);

    },

    updateAppointment(data) {

        return api
            .put(ENDPOINTS.APPOINTMENTS.UPDATE, data)
            .then(res => res.data);

    },

    cancelAppointment(id) {

        return api
            .put(ENDPOINTS.APPOINTMENTS.CANCEL(id))
            .then(res => res.data);

    }

};

export default AppointmentsServices;