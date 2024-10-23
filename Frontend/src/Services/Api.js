import axios from "axios";
const baseURL = 'https://iloveimg-backend.onrender.com';


export const uploadFile = async (data) => {
    try {
        let response = await axios.post(`${baseURL}/upload`, data);
        return response.data;
    } catch (error) {
        console.error('Error in calling API', error.message);
    }
}
