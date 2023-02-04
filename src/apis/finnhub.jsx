import axios from "axios";

const TOKEN = "cfd7gb1r01qj357es47gcfd7gb1r01qj357es480"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
})