

import axios from 'axios';

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const login = (name: string, email: string) => {
    return api.post('/auth/login', { name, email });
};

export const fetchBreeds = () => {
    return api.get('/dogs/breeds');
};

export const searchDogs = (params: any) => {
    return api.get('/dogs/search', { params });
};

export const fetchDogsByIds = (ids: string[]) => {
    return api.post('/dogs', ids);
};

export const matchDog = (ids: string[]) => {
    return api.post('/dogs/match', ids);
};
