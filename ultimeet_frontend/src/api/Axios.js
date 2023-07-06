import axios from "axios";
import { BASE_URL } from "@/constants/apiconfig";
export const axiosInstance = (baseURL = BASE_URL,  headers= { 'X-Requested-With': 'XMLHttpRequest'},) => {
    return axios.create({ baseURL,headers, withCredentials: false});
}


