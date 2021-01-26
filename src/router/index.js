import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Login from '@/pages/Login'

export default new VueRouter({
    routes:[
        {
            path:'/Home',
            component:Home   
        },
        {
            path:'/Search',
            component:Search   
        },
        {
            path:'/Login',
            component:Login,
            meta:{
                isHidden:true
            }   
        },
        {
            path:'/Register',
            component:Register,
            meta:{
                isHidden:true
            }   
        },
        {
            path:'/',
            component:Home   
        }
    ]
})