// 需要管理的状态
export default {
  latitude: '', // 纬度
  longitude: '', // 经度
  geohash: '', //
  address: {}, // 地址相关信息
  foodType: [], // 食品相关分类
  shops: [], // 商家数组
  userInfo: null, // 用户信息
  shopId: 0, // 店铺id
  goodsMenu: [], // 食物目录
  ratings: [], // 评分
  info: {}, // 商家信息
  cartFoods: [], // 购物车商品
  balls: [{
    show: false
  },
  {
    show: false
  },
  {
    show: false
  },
  {
    show: false
  },
  {
    show: false
  }
  ],
  dropBall: [], // 购物车小球
  shopScore: {}, // 店铺总体评分
  shopRatingTags: {}, // 店铺评价tags
  ratingContent: [], // 店铺评价
  searchShops: [], // 搜索店铺结果
  recentSearch: [], // 最近搜索，只存最近十个
  hotKeywords: ['蜜雪冰城', '奶茶', '炒米粉', '杂粮煎饼', '塔斯汀', '上海馄饨', '古茗奶茶', '肯德基', '汉堡', '奈雪'] // 热词

}
