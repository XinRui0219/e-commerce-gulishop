import axios from 'axios';
import NProgress from 'nprogress';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const service = axios.create({
    baseURL:'/api',
    timeout:10000
});

service.interceptors.request.use(
    config => {
        NProgress.done();
        return config;
    }
)

service.interceptors.response.use(
    response => {
        NProgress.done();
        return response.data;
    },
    error => {
        NProgress.close();
        //return Promise.reject('继续处理'+error.message);
        return new Promise(()=>{})
    }
)