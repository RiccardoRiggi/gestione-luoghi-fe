
import axios from "axios";
export default axios.create({
    baseURL: "http://localhost/GitHub-Repository/gestione-luoghi-be/rest",
    headers: {
        "Content-type": "application/json",
    }
});

