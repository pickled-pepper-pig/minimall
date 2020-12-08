<!--  -->
<template>
  <div class="good-list">
    <good-list-item
      v-for="item in goods"
      :goods-item="item"
      :key="item.index"
    />
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";

export default {
  name: "GoodList",
  components: {
    GoodListItem,
  },
  props: {
    goods: {
      type: Array,
      default: [],
    },
  },
  updated() {
    // console.log(this.goods instanceof Object);
    // console.log(this.goods);
  },
};
</script>

<style scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 16px;
}
</style>