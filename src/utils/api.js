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

//登录
function Login(data, cb) {
  PostData('auth/GetSessionKey', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//登录授权
function getUserInfo(data, cb) {
  PostData('auth/GetUserInfo', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//城市店铺主页
function HomeGetShopIndex(cb) {
  GetData('Home/GetShopIndex', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//首页tablist
function HomeGetSectionList(data, cb) {
  GetData('Home/GetSectionList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取实体店接口
function HomeGetStoreList(data, cb) {
  GetData('Home/GetStoreList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//进入用户中心
function GetMemberCenter(cb) {
  PostData('Member/MemberCenter', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取用户信息
function GetMemberInfo(cb) {
  PostData('Member/GetMemberInfo', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取我的收藏
function GetMemberMyFavor(data, cb) {
  PostData('Member/MyFavor', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取我的购物车
function GetMemberMyCart(data, cb) {
  PostData('Member/MyCart', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//更新用户信息
function SaveMemberInfo(data, cb) {
  PostData('Member/SaveMemberInfo', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//添加收藏
function PostMemberAddFavor(data, cb) {
  PostData('Member/AddFavor', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//删除收藏
function PostMemberDeleteFavor(data, cb) {
  PostData('Member/DeleteFavor', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}



//获取发现列表
function GetCampaignList(data, cb) {
  GetData('Campaign/GetCampaignList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//商品分类
function GetProductSortList(cb) {
  GetData('Product/GetSortList', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//产品详情
function GetProductDetail(data, cb) {
  GetData('Product/Detail', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}



module.exports = {
  HOST_URI: HOST_URI,
  API_URL: API_URL,
  Login: Login,
  getUserInfo: getUserInfo,
  HomeGetShopIndex: HomeGetShopIndex,
  HomeGetSectionList: HomeGetSectionList,
  HomeGetStoreList: HomeGetStoreList,
  GetMemberInfo: GetMemberInfo,
  GetMemberCenter: GetMemberCenter,
  GetMemberMyCart: GetMemberMyCart,
  SaveMemberInfo: SaveMemberInfo,
  GetMemberMyFavor: GetMemberMyFavor,
  PostMemberAddFavor: PostMemberAddFavor,
  PostMemberDeleteFavor: PostMemberDeleteFavor,
  GetCampaignList: GetCampaignList,
  GetProductSortList: GetProductSortList,
  GetProductDetail: GetProductDetail
};
