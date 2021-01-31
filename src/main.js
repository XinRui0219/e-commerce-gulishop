import Vue from 'vue'
import App from '@/App.vue';
import router from '@/router';
import store from '@/store'
import mock from '@/mock/mokeServer'

import TypeNav from '@/components/TypeNav';
//import '@/api'   //第一种验证方式
/* import {reqCategoryList} from '@/api';   //第二种验证方式
reqCategoryList(); */

//全局注册的组件,如果一个非路由组件被多个组件使用,name定义在components,注册在全局

Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav)


new Vue({
  render: h => h(App),
  //在main当中把路由器注册到Vue的配置对象
  router, //我们组件的组件内部都可以使用this.$router(路由器对象),和this.$route(当前路由对象)
  store, //我们组件的组件内部都可以使用this.$store 
  
}).$mount('#app')
