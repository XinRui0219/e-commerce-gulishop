//接口请求回来的数据存放在vuex中,并在vuex里面发请求

import Vue from 'vue';
import Vuex from 'vuex';
//引入home魔窟奥德
import home from './home'
Vue.use(Vuex);

//存数据
const state ={

};

//直接修改数据
const mutations = {

};

//与组件当中用户对接
//一般异步发请求
//提交mutations
const actions = {

};

//后面用来简化数据的操作
const getters = {

};

export default new Vuex.Store({
    state,mutations,actions,getters,
    //第五个核心概念,modules代表模块化
    //如果没有模块化,数据直接存在总的store的state中,一旦模块化,
    //home等的属性最终都会合并到state内部,存在的形式home:{},除了总state外其余的还和原来的一样直接存放,不会多一层home
    modules:{
        home
    }
})