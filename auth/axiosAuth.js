import axios from "axios";

//Appel axios qui tape dans l'API test
const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ONLINE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
