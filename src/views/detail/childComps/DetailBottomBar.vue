<template>
  <div class="detail_bottom_bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <div class="text">客服</div>
      </div>
      <div>
        <i class="icon shop"></i>
        <div class="text">店铺</div>
      </div>
      <div>
        <i class="icon select"></i>
        <div class="text">收藏</div>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      // console.log("点击添加到购物车")
      this.$emit("addCart");
    },
  },
};
</script>
<style scoped>
.detail_bottom_bar {
  /* border-top: 1px solid #FBFBFB; */
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(100% - 49px - 44px);
  background-color: #fff;
  display: flex;
  text-align: center;
  height: 49px;
  /* z-index: 999; */
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1
}
.bar-left .text {
  font-size: 14px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 6px auto 3px;    /*上边距10px，下边距3px，左右居中 */
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%; 
  /* 第一个 0 表示背景颜色
  第二个 0/100% 中的 0 表示background-position，指背景图像的起始位置
  如background-position: 15px 20px指将图片向右移15px，向下移20px
  而 100% 表示background-size，用来规定背景图像的尺寸 */
}

.bar-left .service {
  background-position: 0 -54px;
}
.bar-left .shop {
  background-position: 0 -98px;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}
.bar-right .buy {
  background-color: #f69;
}
</style>