import axios from 'axios';


export const fetchRoutes = async () => {
    const apiUrl=process.env.REACT_APP_API_URL;
    try {
        const response = await axios.get(`${apiUrl}/getLink`); // Replace with your API URL
        return response.data;
    } catch (error) {
        console.error('Error fetching routes:', error);
        return [];
    }
};
