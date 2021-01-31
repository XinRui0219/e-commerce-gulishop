<template>
     <!-- 项目的最外层 -->
    <div class="outer">
        <!-- 头部 -->
        <!-- 每一个标签都分别对应一个组件对象,即vc -->
        <Header/>
        <router-view></router-view>
       <!-- 商品分类导航 -->
        <!-- 底部 -->
        <!-- 如果这个里面有很多路径,这种方法会麻烦 -->
        <!-- <Footer v-show="$route.path !=='/login' && $route.path !== '/register'"/> -->
        <Footer v-show="!$route.meta.isHidden"/>
    </div>
  
  
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'

    export default {
      name:'App',
      //非路由组件的注册
      components:{Header,Footer},
      mounted(){
          //在这儿发请求去获取三级分类的一句,那么就只会发一次,因为只发一次就够,所以写zheer
          this.$store.dispatch('getCategoryList')
      }
      
    }
</script>
