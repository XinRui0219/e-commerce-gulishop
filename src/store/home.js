//home的vuex的模块(是个对象)

import {reqCategoryList,reqBannerList,reqFloorList} from '@/api/index'

const state = {
    //与拿到的data数据类型一样
    categoryList:[],
    bannerList:[],
    floorList:[]
};

const mutations = {
    //改state里面的categorylist
    RECEIVE_CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    RECEIVE_BANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    RECEIVE_FLOORLIST(state,floorList){
        state.floorList = floorList;
    },
};

//一旦触发action,就会发请求,在vue中调用action的getCategoryList,在typenav的mounted用dispatch
const actions = {
    //async和await可以通过同步代码实现异步效果,可读性强
    async getCategoryList({commit}){
        //发请求拿数据,,提交给mutations,存储到state
        //axios返回的是promise,①可以用.then.catch写,也可以 使用await
        //result是文档里面的所有值
        const result = await reqCategoryList();
        if(result.code === 200){
            commit('RECEIVE_CATEGORYLIST',result.data);
        }
    },

    async getBannerList({commit}){
        //发请求拿数据,提交给mutations,存储到state
        const result = await reqBannerList();
        if(result.code === 200){
            commit('RECEIVE_BANNERLIST',result.data);
        }
    },

    async getFloorList({commit}){
        //发请求拿数据,提交给mutations,存储到state
        const result = await reqFloorList();
        if(result.code === 200){
            commit('RECEIVE_FLOORLIST',result.data);
        }
    }
};

const getters = {

};


//用一个对象把所有的数据暴露出去
export default{
    state,mutations,actions,getters
}


//await和async作用:
//与.then() 还有.catch()的区别

//await和async可以通过同步代码实现异步效果,可读性强
//.then和.catch可读性不强,里面还有有异步代码(因为有异步回调函数),

//await和async用了之后需要用try-catch,但现在不用try-catch是因为自定义的axios实例对错误进行了统一处理