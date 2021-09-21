
import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
    baseURL: "http://localhost:4433",
    withCredentials: true,
});

export default instance;