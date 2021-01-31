//这个文件就是专门来模拟mock数据接口的
import Mock from 'mockjs';
import banner from './banner.json';
import floor from '@/mock/floor';

//模拟数据借口
Mock.mock('/mock/banner',{code:200,data:banner})//第一个参数,代表我们以后请求的
Mock.mock('/mock/floor',{code:200,data:floor})