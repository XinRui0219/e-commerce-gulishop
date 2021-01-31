<template>
  <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
                <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
                    <h2 class="all">全部商品分类</h2> 
                    <transition name="">
                    <div class="sort"  v-show="isShow">
                        <div class="all-sort-list2" @click="toSearch">
                            <!-- :class --- 首先把原来的hover去掉,改为一个类,是在item身上动态绑定class,移入哪一个item,item就生效
                            设计一个数据  -->
                            <!-- 事件委派:找公共离自己找最近的父辈元素,这个祖先元素只能有一个.item有遍历,不是只有一个,所以不能将事件委托写在item里 -->
                            <div 
                            class="item" 
                            :class="{item_on : currentIndex === index}"
                            @mouseenter="moveInItem(index)"
                            v-for="(c1,index) in categoryList" 
                            :key="c1.categroyId">
                                <h3>
                                    <!-- 第一种写法:把所有a标签换成routerlink,routerlink是一个组件对象,会卡,因为组件标签太多了,导致内存当中组件对象很多,效率不高 -->
                                    <!-- <router-link 
                                    :to="{
                                        name:'search',
                                        query:{
                                            category1Id:c1.categoryId,
                                            category2Id:c1.categoryName
                                        }}">
                                        {{c1.categoryName}}
                                    </router-link> -->
                                    <!-- 把声明导航改为编程式导航可以提高效率,click事件点击之后,是需要调用函数的,
                                    同样每个a标签都添加了点击事件,那么内存中就会定义很多个函数,内存占用是比较大的,效率虽然比声明式导航强,
                                    但是还是不够好
                                    -->
                                    <!-- <a href="##" @click="$router.push({
                                        name:'search',
                                        query:
                                        {category1Id:c1.categoryId,
                                        categoryName:c1.categoryName
                                        }
                                    })">{{c1.categoryName}}</a> -->
                                    <!-- 当 -->
                                    <a href="##" 
                                    :data-category1Id="c1.categoryId"
                                    :data-categoryName="c1.categoryName"
                                    >{c1.categoryName}</a>
                                    
                                </h3>
                                <div class="item-list clearfix">
                                    <div class="subitem">
                                        <dl class="fore" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                               <!--  <a href="##" @click="$router.push({
                                                        name:'search',query:
                                                        {category2Id:c2.categoryId,
                                                        categoryName:c2.categoryName
                                                        }
                                                    })">{{c2.categoryName}}</a> -->
                                                    <a href="##"
                                                    :data-category2Id="c2.categoryId"
                                                    :data-categoryName="c2.categoryName"
                                                    >{c2.categoryName}</a>

                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <!-- <a href="##" @click="$router.push({                                                        
                                                            name:'search',query:
                                                            {category3Id:c3.categoryId,
                                                            categoryName:c3.categoryName
                                                            }
                                                        })">{{c3.categoryName}}</a> -->
                                                        <a href="##"
                                                        :data-category3Id="c3.categoryId"
                                                        :data-categoryName="c3.categoryName"
                                                        >{c3.categoryName}</a>

                                                    
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                </div> 
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
</template>

<script>
    import { mapState } from 'vuex'
    //引入throttle而不是lodash,避免打包后体积比较大    ---在lodash里面最常用的是throttle和debounce
    //import _ from 'lodash'
    import throttle from 'lodash/throttle'
    export default {
        data(){
            return {
                currentIndex:-1,
                isShow:true
            }
        },
        //只能写函数定义,不能写函数调用
        methods:{
            /* moveInItem(index){
                this.currentIndex = index;
                console.log(index)
            } */
            //trailing在时间间隔之后执行函数(常用)  leading是否在时间间隔之前执行函数
            moveInItem:throttle(function(index){
                this.currentIndex = index;
                console.log(index)
            },20,{'trailing': false }),

            moveOutDiv(){
                currentIndex = -1
                if(this.$route.path !== '/home'){
                    this.show = false;
                }
            },

            toSearch(event){
                //event是什么,就是浏览器调用函数传递过来的事件对象,代表你传递的$event,只能在模板里面出现
                let targetNode = event.target;
                console.log(targetNode)
                //绑定事件的元素为事件源,点击的元素为目标元素
                //如果是a标签,那么data一定是有catagory   ,如果不是a标签,则没有
                let data = targetNode.dataset; //获取目标元素身上的data-属性 组成的对象
                //不管点击的是哪个a标签,一级,二级或三级
                //如果点的是a标签,那么参数已经带过来的了
                let {category1id,category2id,category3id,categoryName} = data;
                if(categoryName){
                    //证明点击的就是a标签
                    let location ={
                        name:'search'
                    };
                    let query = {
                        categoryName:categoryName
                    }
                    if(category1id){
                        query.category1id = category1id
                    }else if(category2id){
                        query.category2id = category2id
                    }else{
                        query.category3id = category3id
                    }
                    location.query = query;
                    this.$router.push(location)
                }


            }
        },
        //组件在挂载完成的时候,就立马发请求获取数据,存储到vuex中,而不是直接在vue组件里面
        mounted(){
            //dispatch是分发和触发的意思,和emit的单词意思样
            //本质就是在调用指定的action函数
            //如果发请求在这儿发,只要home和search切换,每一次都要发请求
            //home和search内部都需要重新创建TypeNav组件,mount的就会重新执行
            this.$store.dispatch('getCategoryList');
            if(this.$route.path !== 'home'){
                //证明这个组件是search
                this.isShow = false;
            }

        },
        //从vuex当中把数据捞到vue组件单中使用,
        //以后只要是从vuex拿的是数据(state和getters当中的东西),都在computed当中拿
        //以后只要是从vuex拿的是方法(mutations和actions当中的东西),都在methods当中拿,一般用的很少
        computed:{
            //函数内部可以是数组,也可以是对象
            //是数组必须满足的条件:1/数据直接就是总的state当中的数据,不能是模块里面的,2/数组当中的名字必须和state当中名字一致
            //不符合1,所以不能这么写...mapState(['categoryList']) //因为不是state.categoryList
            
            ...mapState({
                //必须使用对象,而且返回的是state.home.catagoryList
                categoryList:state => state.home.categoryList
            })
        }
    }
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                &.sort-enter{
                    height: 0;
                    opacity:0;
                }
                &.sort-enter-to{
                    height: 461px;
                    opacity: 1;
                }
                &.sort-enter-active{
                    transition: all 2s;
                }

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 715px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &.item-on {
                            background: #e1251b;
                            .item-list {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
  
</style>
<script>
 /* 只要[],{},function出现在了等号的右边,说明都是不一样的地址,每一个都是新的 */
</script>