<!--  -->
<template>
  <div class="shop-cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <!-- 商品列表 -->
    <cart-list class="cart-list" />
    <!-- 底部汇总 -->
    <cart-button-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import CartList from "./childComps/CartList"
import CartButtonBar from "./childComps/CartButtonBar"

import { mapGetters } from 'vuex'

  export default {
    name:'ShopCart',
    components: {
      NavBar,
      CartList,
      CartButtonBar
    },
    computed: {
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    }
  }
</script>

<style scoped>
.shop-cart {
  height: 100vh;
  position: relative;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
}
.cart-list {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 89px;    /* 底部navBar的49px和价格汇总的40px */
  position: absolute;
  overflow: hidden;
  font-size: 18px;
}
</style>