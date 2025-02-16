import axios from "axios";

const TEST_REST_API_URL = "http://localhost:8900/api/tests";

class TestService {
  getTests() {
    return axios.get(TEST_REST_API_URL);
  }

  addTest(test) {
    return axios.post(TEST_REST_API_URL, test);
  }

  getTestById(id) {
    return axios.get(`${TEST_REST_API_URL}/${id}`);
  }

  deleteTest(id) {
    return axios.delete(`${TEST_REST_API_URL}/${id}`);
  }
}

export default new TestService();
