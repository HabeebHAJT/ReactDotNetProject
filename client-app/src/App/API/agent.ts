import axios, { AxiosError, AxiosResponse } from 'axios';
import { Activity } from '../Models/Activity';
import { toast } from 'react-toastify';
import { router } from '../Router/Routers';
import { store } from '../Store/store';
import { User, userForm } from '../Models/User';




const responseBody = <T>(response: AxiosResponse<T>) => response.data

const sleep = (delay: number) => {

    return new Promise((resolve) => {

        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5001/api';

axios.interceptors.request.use(
    config => {
        const token = store.commonStoere.token;
        if (token)
            config.headers.Authorization = `Bearer ${token}`;

        return config;
    }
)

axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;


}, (error: AxiosError) => {
    const { status, data, config } = error.response as AxiosResponse
    switch (status){
        case 400:



            if (data.errors) {

                if (config.method == "get" && Object.prototype.hasOwnProperty.call(data?.errors, "id")) {
                    router.navigate("/not-found");
                }
                const modelStatelist = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStatelist.push(data.errors[key])
                    }
                }

                throw modelStatelist.flat();

            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.warning("Un Authorized");
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            router.navigate("/not-found")

            break;
        case 500:
            store.commonStoere.setServerError(data);
            router.navigate("/server-error");
            break;
    }

    return Promise.reject(error);

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

const Account = {

    current: () => request.get<User>("/Account"),
    login: (model: userForm) => request.post<User>('/Account/login', model),
    register: (model: userForm) => request.post<User>('/Account/register', model),

}

const agent = {

    Activities,
    Account
}

export default agent;