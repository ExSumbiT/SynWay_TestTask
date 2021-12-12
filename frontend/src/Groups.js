import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class GroupsApi{
    constructor(){}

    getGroups() {
        const url = `${API_URL}/api/group/`;
        return axios.get(url).then(response => response.data);
    }

    getGroup(pk) {
        const url = `${API_URL}/api/group/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteGroup(group) {
        const url = `${API_URL}/api/group/${group.id}`;
        return axios.delete(url);
    }

    createGroup(group) {
        const url = `${API_URL}/api/group/`;
        return axios.post(url, group);
    }

    updateGroup(group) {
        const url = `${API_URL}/api/group/${group.id}`;
        return axios.put(url, group);
    }
}