import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class UsersApi{
    constructor(){}

    getUsers() {
        const url = `${API_URL}/api/user/`;
        return axios.get(url).then(response => response.data);
    }


    getUser(pk) {
        const url = `${API_URL}/api/user/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteUser(user) {
        const url = `${API_URL}/api/user/${user.id}`;
        return axios.delete(url);
    }

    createUser(user) {
        const url = `${API_URL}/api/user/`;
        return axios.post(url, user);
    }

    updateUser(user) {
        const url = `${API_URL}/api/user/${user.id}`;
        return axios.put(url, user);
    }
}