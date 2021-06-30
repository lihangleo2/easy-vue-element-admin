const CONTACT_API = {

    //登录
    login: {
        method: 'post',
        url: '/cobrain/user/login'
    },

    //退出登录
    loginOut: {
        method: 'post',
        url: '/cobrain/user/logout'
    },

    //批量上传图片
    uploadFiles: {
        method: 'post',
        url: '/cobrain/file/uploadFile'
    }

}

export default CONTACT_API