//这个文件是对axios进行二次封装
//额外的让axios发请求的时候,具有其他功能
 
//配置基础路径和超时限制
//添加进度条信息 nprogress
//返回的响应不在需要从data属性当中拿数据,而是响应就是我们要的数据
//统一处理请求错误,具体请求也可以选择处理或不处理

import axios from 'axios';
//引入nprogress相关的js和css
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


//以后只要是对axios二次封装,不会咋axios身上直接去封装,而是创建一个新的axios实例进行封装
//传建一个新的和axios具有相同功能的一个实例
const service = axios.create({
    //配置基础路径和超时限制
    baseURL:'/mock',  //设置当前项目当中所有接口路径的公共路径部分,基础路径
    timeout:10000  //当ajax请求超过设置的这个时间就会报错
});

//添加进度条信息功能
//如果想给axios添加额外的功能或者是给请求头添加额外的信息,必然用到axios的请求拦截器和响应拦截器

//请求拦截器,每个ajax请求都会经过这个拦截器拦截
service.interceptors.request.use(
    //请求拦截器当中成功的回调,一个参数config--是我们的请求报文.这个请求报文最后一定要返回,因为还要继续往下走
    config =>{
        //在这里我们可以添加额外的功能,也可以给请求头添加需要的数据
        NProgress.start(); //开启进度条
    return  config;
},function(error){
    return Promise.reject(error); //失败的请求一般不写,因为失败了也就没有下文了
});

//响应拦截器
service.interceptors.response.use(
    response => {
        //response就是我们的响应报文,同样可以添加额外的功能,或者对响应报文进行处理
        NProgress.done();//停止进度条
        return response.data;
},
    error => {
        NProgress.done();
        console.log('发送的ajax请求失败'+error.message || '未知错误')
        //后面想继续处理这个错误,返回失败的promise
       // return Promise.reject(new Error('failed'));
       //不让后面继续处理这个错误,中断promise链
       return new Promise(()=>{}) //返回单额是pending状态的promise,代表中断promise链,后期也就没办法处理了
});

export default service;