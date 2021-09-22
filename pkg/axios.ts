
import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
    baseURL: "http://localhost:4433",
    withCredentials: true,
    paramsSerializer: function (params) {
        let result = '';
        Object.keys(params).forEach(key => {
            result += `${key}=${key == "return_to" ? params[key] : encodeURIComponent(params[key])}&`;
        });
        return result.substr(0, result.length - 1);
    }
});

export default instance;