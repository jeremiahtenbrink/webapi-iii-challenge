import axios from 'axios';

export default axios.create({
    baseURL: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID 278ab74fd824dd0f9dc13686c975cca03bbf291c907bffd103f890e80142b2d1"
    }
});