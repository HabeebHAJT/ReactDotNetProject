import axios, { AxiosResponse } from 'axios';
import { Activity } from '../Models/Activity';




const responseBody = <T>(response: AxiosResponse<T>) => response.data

const sleep = (delay: number) => {

    return new Promise((resolve) => {

        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5001/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    }
    catch (error) {
        return await Promise.reject(error);
    }

});


const request = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),

}


const Activities = {

    list: () => request.get<Activity[]>("/Activity"),
    details: (id: string) => request.get<Activity>('/Activity/' + id),
    create: (activity: Activity) => request.post<Activity>('/Activity', activity),
    update: (activity: Activity) => request.put<Activity>('/Activity', activity),
    delete: (id: string) => request.delete<Activity>('/Activity/'+id)
}

const agent = {

    Activities
}

export default agent;