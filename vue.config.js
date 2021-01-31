//配置webpack文件
module.exports = {
    lintOnSave:false, //禁用eslint
    //webpack 里面有一个开发中
    devServer:{
        proxy: {
            "/api": {
                //转发的目标服务器地址 ----文档的开发者服务器
              target: "http://182.92.128.115/",
              //路径重写:是否把路径当中的/api去掉,要不要去掉/api要看接口路径里有没有,如果有就不去掉, 
              //pathRewrite: {"^/api" : ""}
            }
        }
    }
}
