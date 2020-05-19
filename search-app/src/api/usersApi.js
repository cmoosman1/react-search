import axios from "axios";

export default {
  getSystemUsers: () =>
    axios.get('https://gorest.co.in/public-api/users?access-token=az__2y-lWm4IiGNvAmJ_ECKpUHrXjHOBdJ-9')
};