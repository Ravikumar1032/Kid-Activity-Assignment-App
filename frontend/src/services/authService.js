import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const loginWithGoogle = async (user) => {
  const response = await axios.post(`${API_URL}/login/google`, user);
  return response.data;
};
