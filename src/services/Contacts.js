import api from "../api/axios";
import { ENDPOINTS } from "../constants/api";

const ContactServices = {

  createContact(data) {
    return api.post(ENDPOINTS.CONTACTS.CREATE, data);
  },


  getAllContacts() {
    return api.get(ENDPOINTS.CONTACTS.ALL);
  },


  getContactById(id) {
    return api.get(ENDPOINTS.CONTACTS.BY_ID(id));
  },


  deleteContact(id) {
    return api.delete(ENDPOINTS.CONTACTS.DELETE(id));
  },
};

export default ContactServices;