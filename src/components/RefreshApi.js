import axios from 'axios';

export async function fetchSearchData(formData) {
  try {
    const response = await axios.post('/api/SemesterWarning/Combined', formData);
    return response.data;
  } catch (error) {
    console.error("API request error: ", error);
    throw error;
  }
}