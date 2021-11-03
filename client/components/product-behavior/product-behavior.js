export default Behavior({
  behaviors: [],
  properties: {
    product: {
      type: Object,
      value: {

      },
      observer: function (product) {},
    }
  },
  data: {

  },

  methods: {
    productDetails(e) {
      console.log(e.currentTarget.dataset);
      let id = e.currentTarget.dataset.productid;
      wx.navigateTo({
        url: '/pages/product/product?product_id=' + id,
      })
    }
  }
})