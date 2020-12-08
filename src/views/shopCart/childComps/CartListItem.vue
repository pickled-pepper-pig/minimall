<!--  -->
<template>
  <div id="shop-item">
    <div class="item-selector">
      <!-- 在mutations中添加一件商品会令该商品的checked属性变为true -->
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick" />  
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">{{ itemInfo.price }}</div>
        <div class="item-price right">{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
      console.log(this.itemInfo.checked)
      // this.itemInfo.checked = false
    }
  }
};
</script>

<style scoped>
#shop-item {
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 20px;
  height: 18px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title, .item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-info, .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom {
  padding-top: 10px;
  position: absolute;
  bottom: 5px;
  left: 10px;
  right: 10px;
}
.item-bottom, .item-price {
  color: orangered;
}

</style>