import axios from 'axios'
import service from '../service/index.js'
import store from '@/store';
import { ElMessage  } from 'element-plus'


//设置baseURL及超时时长
let instance = axios.create({
    baseURL: process.env.VUE_APP_AppUrl,
    timeout: 10000
})

function toggleLoading(bl) {
    if (bl) {
        store.commit('SET_LOADING')
    } else {
        store.commit('CANCLE_LOADING')
    }
}


//定义包裹请求方法的容器
const Http = {}

//对api文档进行循环，并把每个方法都赋值到Http上去
for (let key in service) {
    //这里变量api就相当于getHomeList对象，包含了url 和method
    let api = service[key]
    //将方法赋值到Http里去(这里使用async的目的是为了，可能请求2个方法，方法2要在方法1请求完后再请求)
    Http[key] = async function (
        params,//要传递的参数
        isFormData = false,//是表单还是json上传
    ) {
        let showLoading = undefined
        if (typeof (params) != "undefined") {
            showLoading = params.showLoading;
            if (showLoading && typeof (showLoading) != "undefined") {
                toggleLoading(true);
                delete params.showLoading;
            }
        }

        let url = api.url
        //如果是要添加token话，可以在这里添加，当然也可以在拦截器里添加
        // config.headers.token = newParams
        let config = {
            // headers:{
            // token:""
            // }
        }
        let newParams = {}

        //判断content-type是否为表单形式，是否需要拼接在url上
        if (params && isFormData) {//如果有参数且为表单格式的话，把参数转换一下
            newParams = new FormData()
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params
        }

        let response = {}
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                response = await instance[api.method](api.url, newParams, config)
            } catch (error) {
                response = error
            }

        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams

            try {
                response = await instance[api.method](api.url, config)
            } catch (error) {
                response = error
            }
        }



        if (typeof (showLoading) != "undefined" && showLoading) {
            toggleLoading(false);
        }
        return response//返回响应值

    }

}


// 拦截器的添加
instance.interceptors.request.use(config => {
    // 本地拿token
    let _tk = localStorage.getItem('COBRAIN_ADMIN_TK');
    if (_tk) {
        config.headers.Authorization = _tk;
    }
    return config
}, err => {
    return Promise.reject(err)
})

//响应拦截器
instance.interceptors.response.use(response => {
    //这里是处理登录token失效的操作，回到登录页面
    if (response.status && response.status == 200) {
        // 错误处理
        if (response.data.code) {
            ElMessage({
                type: 'error',
                message: response.data.msg,
                duration: 1500,
                onClose: () => {
                    // 登录过期
                    if (response.data.code == 100) {
                        this.$router.replace('/');
                    }
                }
            })
        }
    }
    return response.data
}, err => {
    //请求失败(前端做法是取消loading圈给提示)
    return Promise.reject(err)
})





export default Http

/**
 * 如果有某几个接口需要单独处理返回值时：
 * 1、可以在这个封装类里，定义一个url list然后在返回值里进行一个比对，包含在内的话那么单独处理
 * 2、最简单快捷的话，就是用axios直接单独写一个
 *
 */