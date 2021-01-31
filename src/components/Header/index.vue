<template>
    <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p>
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <a href="###">我的订单</a>
                        <a href="###">我的购物车</a>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" title="尚品汇" to="/home" target="_blank">
                    <!-- <a class="logo" title="尚品汇" href="###" target="_blank"> -->
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" 
                        v-model="keyword"
                        />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch" >搜索</button>
                    </form>
                </div>
            </div>
        </header>
    
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
        keyword:''
       };
  },
  methods:{
      //执行步骤
      //第一步---用户改变路径:点击了搜索按钮就会调用this,$router.push('/search')
      //第二补---这个路径就会去路由器的路由数组和路由对象一个一个自上而下匹配,匹配就显示注册的路由组件,如果一直没有匹配到,就会报错
      //传递的parmas参数会被路径后面的:xxx匹配,并且xxx会收集传过来的params参数,最终这个参数,会被放到当前这个路由对象的params属性当中
      //传递的query参数不会在匹配的时候占位,但是这个参数,会被放到当前这个路由对象的query属性当中
      //第三步---切换显示刚匹配成功的路由组件,显示组件的同时会把方才匹配的路由对象也放到这个组件$route中
      toSearch(){
        //   console.log(this)//this是vc,
        //   console.log(this.$router)//this.$router是VueRouter的实例化对象, 
        //   console.log(this.$router.push)
        console.log(1)
          //this.$router.push('/search/' + this.keyword) //
          this.$router.push({
               name:'search',
               params:{keyword:this.keyword},
               //query:{keyword1:this.keyword}
            })
      }
  },
  props:['keyword1','keyword2'],
  //路由传参的种类:params参数和query参数
  //params参数是属于 <- 路径 -> 的一部分,路由当中匹配的时候要照顾到这个参数  '/search/'+htis.keyword
  //query参数是在路径后面以 ? 分割      '/search?keyword' = this.keyword


  //路由路径带参数的三种写法
  //1,字符串写法  this.$router.push('/search/'+this.keyword +'?' keyword1 = this.keyword.toUpperCase())
  //2,模板字符串  this.$router.push(`/search/${this.keyword}?keyword1=${this.keyword.toUpperCase()}`)
  //3,对象写法(重点) 
    // this.$router.push({
    //   name:'search',
    //   params:{keyword:this.keyword},
    //   query:{keyword1:this.keyword}
    //   })





  
};
</script>

<style lang="less" scoped>
  .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }

</style>

<script>
    //路由传参相关:跳转路由的两种基本方式:声明式<router-link to="">  编程式:this.$router.push()/replace()
    //编程式导航比声明式导航,更加灵活(内部可以加入自己的逻辑),某些情况效率会更好

    //面试1:指定params参数是可不可以用path和params配置的组合(对象写法)
    /* 
    如果传递的参数只有query参数,没有params参数,那么我们可以不用写name,可以使用path
    如果传递的参数包含params参数,就不能使用path去配合,只能用name去配合  ---(不会报错,但是不能页面没有显示内容)
    所以对象写法,最好以后写name,因为name既能和params配合也能和query配合,而path只能和query去配合,不能和params配合
    */

   //面试2:如何让params参数可传可不传
   /* 
    path:'/search/:keyword?' 在path路径后面占位加问号
    */

    //面试3:如果指定name和params配合,但params中的数据是一个"",无法跳转,路径会出问题,(注意也不会报错)
   /* 
    1,不传params参数
    2,首先必须在params可传可不传的前提下,当传递的参数为空串时,传递成undefined,就不会出问题
    params:{keyword:'' || undefined},
    */

    //面试4:路由组件可不可以使用props   -----在router的route里面配置
   /* 
   props:这个props是我们在路由组件当中操作params参数和query参数的简化方法  即由$route.query(params).keyword 简化为keyword
   props:true  --- 会默认的把传递过来的params参数,额外的映射为组件当中的属性去操作  
   props:{user:'zlx'} ---传递一个对象,传递的是额外需要的静态数据,不需要就不用
   props:(route) => {
       return {keyword:route.params.keyword,keyword1:route.query.keyword}
   }  --- 参数为当前的路由对象,
    */
    
    //vue-router使用的是3.1.0以上的版本,search传的参数不变,多次点击使用编程式导航,会报错
    /* 1,在跳转时(指定成功或失败的回调函数,即push方法里加一个或两个参数()=>{}),这个版本引入promise,push需要传2-3个参数,如果只传一个则会返回一个失败的promise,没有处理时就会报错不能一劳永逸,每个push都得写
       2,修改vue原型的 push 和 replace 方法
    
    */

</script>