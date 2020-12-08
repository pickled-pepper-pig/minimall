<!--  -->
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />
      <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem"

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
/* .cart-list {
  font-size: 20px;
  position: relative;
  top: 44px;
  bottom: 49px;
} */
.content {
  height: 100%;
}
</style>