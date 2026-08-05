import axios from "axios";

const API = axios.create({
    baseURL: "https://textile-marketplace-koe4.onrender.com/api"
});

export default API;