//引入并声明使用插件
import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Login from '@/pages/Login';


//VueRouter是路由器对象的构造函数
//this.$router.push调用的是路由器对象的方法,这个方法并不是路由器实例化对象的方法,而是这个对象原型上的方法
//这个实例化对象原型的方法就是VueRouter的显式原型的发法
//this.$router是实例化对象,  是VueRouter的实例化对象
 const originPush = VueRouter.prototype.push;          //将原有的push方法地址,保存起来,后期还能拿到原来的
 console.log(originPush)
//将原有的push指向另一个函数
VueRouter.prototype.push = function(location,onResolved,onRejected){
    //location就是我们调用this.$router.push,传递过来的对象{name,params,query}
    if(onRejected === undefined && onResolved === undefined){
        //证明调用的时候只传递了个匹配路由对象,没有传递成功或者失败的对调
        return originPush.call(this,location).catch(()=>{})
    }else{
        return originPush.call(this,location,onResolved,onRejected)
    }
} 

const originReplace = VueRouter.prototype.replace;          //将原有的Replace方法地址,保存起来,后期还能拿到原来的
//将原有的Replace指向另一个函数
VueRouter.prototype.replace = function(location,onResolved,onRejected){
    //location就是我们调用this.$router.replace,传递过来的对象{name,params,query}
    if(onRejected === undefined && onResolved === undefined){
        //证明调用的时候只传递了个匹配路由对象,没有传递成功或者失败的对调
        return originReplace.call(this,location).catch(()=>{})
    }else{
        return originReplace.call(this,location,onResolved,onRejected)
    }
} 

//向外暴露一个路由器router的对象,里面传入配置对象,
export default new VueRouter({
    routes:[ //配置路由route
        {
            path:'/home',
            component:Home   
        },
        {
            path:'/search/:keyword?', //?代表我的params可传可不传
            component:Search,
            name:'search', //命名路由
            props: (route) => ({keyword1:route.params.keyword, keyword2:route.query.keyword}),
        },
        {
            path:'/login',
            component:Login,
            //路由当中的原配置项,可以配置任何我们需要的数据
            meta:{
                isHidden:true
            }   
        },
        {
            path:'/register',
            component:Register,
            
            meta:{
                isHidden:true
            }   
        },
        {
            path:'/', //path和redirect写的都是路径
            redirect:'/home'   
        }
    ]
})


//路由组件和非路由组件的区别
//使用的三大步骤:定义注册使用
//定义方法一样,定义的位置不一样:非路由在components文件夹,路由组件定义在pages文件夹中
//注册的时候:非路由组件是在使用的组件当中,路由组件是在路由配置当中注册(main.js中)
//使用的时候:非路由组件使用注册的组件标签,路由组件使声明式导航(router-link,router-view)和编程式导航使用(push replace)
//生命周期不同:非路由组件在关闭浏览器时结束生命,路由组件在切换的时候结束生命(keep-alive)