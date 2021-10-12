
import axios from "axios";


const instance = axios.create({
    // .. where we make our configurations
    baseURL: process.env.NEXT_PUBLIC_KRATOS_URL,
    withCredentials: true,
    paramsSerializer: function (params: any) {
        let result = '';
        Object.keys(params).forEach(key => {
            result += `${key}=${key == "return_to" ? params[key] : encodeURIComponent(params[key])}&`;
        });
        return result.substr(0, result.length - 1);
    }
});

export default instance;