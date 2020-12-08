<!--  -->
<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <div>全选</div>
    </div>
    <div class="totalPrice">合计:{{totalPrice}}</div>
    <div class="calculate">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"
import { mapGetters } from "vuex";

  export default {
    name:'CartButtonBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(["cartList"]),

      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + parseInt(item.price.substring(1)) * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        // console.log(!(this.$store.getters.cartList.filter(item => !item.checked).length))
        // return !(this.$store.getters.cartList.filter(item => !item.checked).length)
        if(this.cartList.length === 0) return false
        return !this.cartList.find(item => item.checked)
      }
    },
    methods: {
      checkClick() {
        // if(this.isSelectAll) {   // 全部选中
        //   this.cartList.forEach(item => item.checked = false)
        // } else {
        //   this.cartList.forEach(item => item.checked = true)
        // }
        this.cartList.forEach(item => item.checked = !this.isSelectAll)
      }
    }
  }
</script>

<style scoped>
  .buttom-bar {
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    /* 减去顶部navBar的高度44px，再减去底部mainTabBar的高度49px，以及自身的高度40px */
    top: calc(100% - 44px - 49px - 40px);
    font-size: 18px;
    text-align: center;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .totalPrice {
    margin-left: 15px;
    flex: 1;
  }
  .calculate {
    /* margin-left: 80px; */
    width: 100px;
    background-color: pink;
    color: #fff;
  }
</style>