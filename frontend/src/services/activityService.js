import axios from 'axios';

const API_URL = 'http://localhost:5000/api/activities';

export const createActivity = async (activity) => {
  const response = await axios.post(`${API_URL}/create`, activity);
  return response.data;
};

export const getActivities = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
