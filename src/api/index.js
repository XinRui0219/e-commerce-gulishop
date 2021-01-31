//这个文件写的都是函数,我们叫接口请求函数.以后每个接口对应了一个函数,如果想要拿相关接口的数据,只需要调用相关的接口请求函数

import request from "./ajax";
import mockAjax from './mockAjax';
//请求三级分类列表数据  
//文档里面显示 有url:/api/product/getBaseCategoryList 
//和method get
//参数:没有参数

//axios使用有函数用法,对象用法
export const reqCategoryList = () => {
    return request({
        url:'/product/getBaseCategoryList',//此时不需要写api,因为已经写过了
        method:'get'
    })
}

//验证请求是否成功,  验证测试接口请求函数方式
//reqCategoryList();//这里如果调用需要把模块引入到main中,如果不引入不会执行
//验证完报了404,打开控制台network看url,发现本地localhost没有那些路径,所以需要配代理,
//代理配置在webpack中找--去vue.config中配---配完记得重启]运行项目
    

//请求获取模拟接口的数据banner和floor
export const reqBannerList = () => {
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}

export const reqFloorList = () => {
    return mockAjax({
        url:'/floor',
        method:'get'
    })
}











//axios使用 有函数用法和对象用法
//三种参数:params/query/请求体参数
//params参数:是在url当中携带的,属于路径的一部分
//query参数,可以在url当中携带?分割,后面就是query参数,也可以在配置对象当中的配置,配置的属性名叫params
//请求体参数,在配置对象当中data里面配置,请求方式是put和post才有的请求体参数

//对象写法
/* 
axios({
    url:'里面配params参数',
    method:'',
    params:{
        //代表的query参数
        name:''
    },
    data:{
        //里面配请求体参数
    }
})  */
