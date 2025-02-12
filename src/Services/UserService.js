import axios from "axios";

const USER_REST_API_URL = "http://localhost:8900/users";

class UserService {
  getUsers() {
    return axios.get(USER_REST_API_URL);
  }

  addUser(user) {
    return axios.post(USER_REST_API_URL, user);
  }

  findUserByEmail(email) {
    return axios.get(${USER_REST_API_URL}/email/${email});
  }
}

export default new UserService();