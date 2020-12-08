<!--  -->
<template>
  <div class="goods-list-item" @click='itemClick'>
    <a href="#">
      <img v-lazy="imgShow" alt="" @load="imageLoad"/>
    </a>
    <div class="goods-info">
      <p>{{ GoodsItem.title }}</p>
      <span class="price">{{ GoodsItem.price }}</span>
      <span class="collect">{{ GoodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    GoodsItem: {
      type: Object,
      default: {},
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageload");
    },
    itemClick() {
      this.$router.push('/detail/' + this.GoodsItem.iid)
    }
  },
  computed: {
    imgShow() {
      return this.GoodsItem.image || this.GoodsItem.show.img
    }
  }
};
</script>

<style scoped>
.goods-list-item {
  width: 48%;
  position: relative;
  padding-bottom: 40px;
}
.goods-list-item img {
  width: 100%;
}
.goods-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* margin-bottom: 3px; */
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 30px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>