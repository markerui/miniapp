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

function wxLogin(cb) {
  wx.login({
    success(res) {
      if (res.code) {
        var Data = {
          code: res.code
        };
        Login(Data, function (res) {
          wx.setStorageSync('tokenId', res.resultData.tokenId);
          if (cb) {
            cb(res)
          }
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '登录失败,请重试!',
          showCancel: false
        });
      }
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

//我的优惠券
function PostMemberMyCoupon(data, cb) {
  PostData('Member/MyCoupon', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//我的礼品卡
function PostMemberMyGiftCard(data, cb) {
  PostData('Member/MyGiftCard', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//激活礼品卡
function PostMemberActivateGiftCard(data, cb) {
  PostData('Member/ActivateGiftCard', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取收货地址
function PostMemberGetAddressList(data, cb) {
  PostData('Member/GetAddressList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//添加收货地址
function PostMemberAddAddress(data, cb) {
  PostData('Member/AddAddress', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//获取收货地址
function PostMemberGetAddress(data, cb) {
  PostData('Member/GetAddress', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//编辑地址
function PostMemberEditAddress(data, cb) {
  PostData('Member/EditAddress', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//删除地址
function PostMemberDeleteAddress(data, cb) {
  PostData('Member/DeleteAddress', data, function (res) {
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

//我的购物车
function GetMemberMyCart(cb) {
  PostData('Member/MyCart', '', function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//添加到购物车
function PostMemberAddCart(data, cb) {
  PostData('Member/AddCart', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//修改购物车
function PostMemberModifyCart(data, cb) {
  PostData('Member/ModifyCart', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//删除购物车
function PostMemberDeleteCart(data, cb) {
  PostData('Member/DeleteCart', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//确认订单or直接购买
function PostOrderConfirmOrder(data, cb) {
  PostData('Order/ConfirmOrder', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//创建订单页
function PostOrderCreateOrder(data, cb) {
  PostData('Order/CreateOrder', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//我的订单列表
function PostMemberGetOrderList(data, cb) {
  PostData('Member/GetOrderList', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//我的订单详情
function PostMemberOrderDetail(data, cb) {
  PostData('Member/OrderDetail', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}


//我的订单详情物流
function PostMemberOrderLogistics(data, cb) {
  PostData('Member/OrderLogistics', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

//设置订单状态
function PostMemberSetOrderStatus(data, cb) {
  PostData('Member/SetOrderStatus', data, function (res) {
    if (cb) {
      cb(res)
    }
  });
}

module.exports = {
  HOST_URI: HOST_URI,
  API_URL: API_URL,
  wxLogin: wxLogin,
  getUserInfo: getUserInfo,
  HomeGetShopIndex: HomeGetShopIndex,
  HomeGetSectionList: HomeGetSectionList,
  HomeGetStoreList: HomeGetStoreList,
  GetMemberInfo: GetMemberInfo,
  GetMemberCenter: GetMemberCenter,
  GetMemberMyCart: GetMemberMyCart,
  PostMemberAddCart: PostMemberAddCart,
  PostMemberDeleteCart: PostMemberDeleteCart,
  PostMemberModifyCart: PostMemberModifyCart,
  SaveMemberInfo: SaveMemberInfo,
  GetMemberMyFavor: GetMemberMyFavor,
  PostMemberMyCoupon: PostMemberMyCoupon,
  PostMemberMyGiftCard: PostMemberMyGiftCard,
  PostMemberGetAddressList: PostMemberGetAddressList,
  PostMemberAddAddress: PostMemberAddAddress,
  PostMemberGetAddress: PostMemberGetAddress,
  PostMemberEditAddress: PostMemberEditAddress,
  PostMemberDeleteAddress: PostMemberDeleteAddress,
  PostMemberActivateGiftCard: PostMemberActivateGiftCard,
  PostMemberAddFavor: PostMemberAddFavor,
  PostMemberDeleteFavor: PostMemberDeleteFavor,
  GetCampaignList: GetCampaignList,
  GetProductSortList: GetProductSortList,
  GetProductDetail: GetProductDetail,
  PostOrderConfirmOrder: PostOrderConfirmOrder,
  PostOrderCreateOrder: PostOrderCreateOrder,
  PostMemberGetOrderList: PostMemberGetOrderList,
  PostMemberOrderDetail: PostMemberOrderDetail,
  PostMemberOrderLogistics: PostMemberOrderLogistics,
  PostMemberSetOrderStatus: PostMemberSetOrderStatus
};
