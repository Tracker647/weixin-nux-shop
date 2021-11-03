 // 云函数入口文件
 const cloud = require('wx-server-sdk')
 const TcbRouter = require('tcb-router');

 // 返回工具类
 const returnUtil = require('utils/ReturnUtil.js')
 // 轮播业务层
 const banner = require('service/bannerService.js')
 // 主题业务层
 const theme = require('service/themeService.js')
 // 商品信息业务层
 const product = require('service/productService.js')
 //订单
 const order = require('service/orderService.js')
 //搜索功能
 const search = require('service/searchService.js')

 const IMGPREFIX = 'cloud://nux-shop-practice-6e2lfm6ba1d2a8.6e75-nux-shop-practice-6e2lfm6ba1d2a8-1304982532';
 // 云函数入口函数
 exports.main = async (event, context) => {
   console.log(`index云函数`, event, context);
   const app = new TcbRouter({
     event
   });

   /* 首页 */
   // 获取轮播
   app.router('getBanner', async (ctx, next) => {
     // banner.getBanner() 取出数据，然后对数据进行重新拼装
     ctx.data = await _bannerItem(banner.getBanner())
     ctx.body = await returnUtil.success(ctx)
     await next();
   })
   // 获取主题
   app.router('getTheme', async (ctx, next) => {
     ctx.data = await _themeItem(theme.getTheme())
     ctx.body = await returnUtil.success(ctx)
     await next()
   })

   // 获取最新前5商品
   app.router('getProductNew', async (ctx, next) => {
     // product.getProduct({},0,4) page size默认为0,10 这里设置为0,4
     ctx.data = await _productItem(product.getProduct({}, 0, 4))
     ctx.body = await returnUtil.success(ctx)
     await next()
   })

   // 轮播图片地址拼接
   function _bannerItem(data) {
     return new Promise((resolve, reject) => {
       data.then(res => {
         res.data.forEach(data => {
           data.image = IMGPREFIX + data.image
         })
         resolve(res)
       })
     })
   }
   // 主题图片地址拼接
   function _themeItem(data) {
     return new Promise((resolve, reject) => {
       data.then(res => {
         res.data.forEach(data => {
           data.theme_icon = IMGPREFIX + data.theme_icon
         })
         resolve(res)
       })
     })
   }
   // 多个商品图片地址拼接
   function _productItem(data) {
     return new Promise((resolve, reject) => {
       data.then(res => {
         res.data.forEach(data => {
           data.product_img = IMGPREFIX + data.product_img
         })
         resolve(res)
       })
     })
   }
   // 单个商品图片地址拼接
   function _productImg(data) {
     return new Promise((resolve, reject) => {
       data.then(res => {
         console.log(res.data);
         res.data.product_img = IMGPREFIX + res.data.product_img
         resolve(res)
       })
     })
   }
   /* 分类 */
   // 获取分类
   app.router('getCategoryMenu', async (ctx, next) => {
     ctx.data = await product.getCategoryMenu()
     ctx.body = await returnUtil.success(ctx)
     await next()
   })
   // 获取分类商品
   app.router('getCategoryProduct', async (ctx, next) => {
     let options = {}
     // ctx.data 前台传过来的category_type
     options.category_type = event.data
     ctx.data = await _productItem(product.getCategoryProduct(options))
     ctx.body = await returnUtil.success(ctx)
     await next()
   })
   /* 商品信息 */
   app.router('getProductById', async (ctx, next) => {
     let product_id = event.data.product_id;
     console.log(product_id);
     ctx.data = await _productImg(product.getProductById(product_id))
     ctx.body = await returnUtil.success(ctx);
     await next()
   })
   /* 主题商品 */
   app.router('getThemeProduct', async (ctx, next) => {
     // 前台传入主题类型
     let theme_type = event.data.theme_type;
     ctx.data = await _productItem(product.getThemeProduct(theme_type));
     ctx.body = await returnUtil.success(ctx);
     await next();
   })
   /* 生成订单 */
   app.router('createOrder', async (ctx, next) => {
     // event.data.orderData, event.userInfo
     ctx.data = await order.createOrder(event.data.orderData, event.userInfo);
     ctx.body = await returnUtil.success(ctx);
     await next();
   })
   // 根据订单获取信息
   app.router('getOrderById', async (ctx, next) => {
     let orderId = event.data.orderId
     ctx.data = await order.getOrderById(orderId)
     ctx.body = await returnUtil.success(ctx)
     await next()
   })

   // 获取订单信息
   app.router('getOrderList', async (ctx, next) => {
     ctx.data = await order.getOrderList(event.userInfo)
     ctx.body = await returnUtil.success(ctx)
     await next()
   })

   //获取搜索结果
   app.router('getSearchResult', async (ctx, next) => {
     ctx.data = await search.getSearchResult(event.data.keyword);
     for (let i = 0; i < ctx.data.data.length; i++) {
       console.log(ctx.data.data[i]);
       ctx.data.data[i].query_name = ctx.data.data[i].product_name
     }
     ctx.body = await returnUtil.success(ctx);
     await next()

   })
   return app.serve();
 }