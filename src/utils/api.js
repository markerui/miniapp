import wepy from 'wepy';

const HOST_URI = 'https://t1.yxbest.com.cn';
const API_URL = HOST_URI + '/api/';

function Request(options) {
    var tokenId = '';
    try {
        tokenId = wx.getStorageSync("tokenId");
    } catch (e) {}
    wepy.request({
        url: API_URL + options.url,
        data: options.data,
        method: options.method ? options.method : 'POST',
        header: {
            'tokenId': tokenId,
        },
        success: res => {
            var data = res.data;
            options.success(data);
            return data;
        },
        fail: res => {
            if (options.fail) {
                options.fail(res)
            }
        },
        complete: options.complete ? options.complete : null
    });
}

function Post(options) {
    Request(options);
}

function Get(options) {
    options.method = 'GET';
    Request(options);
}

function PostData(url, options, fn) {
    Post({
        url: url,
        data: options,
        success: res => {
            fn(res);
        },
        fail: res => {
            return 0;
        },
    });
}

function GetData(url, options, fn) {
    Get({
        url: url,
        data: options,
        success: res => {
            fn(res);
        },
        fail: res => {
            return 0;
        },
    });
}

//城市店铺主页
function HomeGetShopIndex(cb){
    GetData('Home/GetShopIndex', '', function (res) {
        if (cb) {
            cb(res)
        }
    });
}

//s首页tablist
function HomeGetSectionList(data,cb){
    GetData('Home/GetSectionList', data, function (res) {
        if (cb) {
            cb(res)
        }
    });
}

//登录
function Login(data, cb) {
    PostData('auth/GetSessionKey', data, function (res) {
        if (cb) {
            cb(res)
        }
    });
}

//登录
function LoginUser(data, cb) {
    PostData('auth/GetUserInfo', data, function (res) {
        if (cb) {
            cb(res)
        }
    });
}




module.exports = {
    HOST_URI: HOST_URI,
    API_URL: API_URL,
    Login: Login,
    LoginUser: LoginUser,
    HomeGetShopIndex: HomeGetShopIndex,
    HomeGetSectionList: HomeGetSectionList
};