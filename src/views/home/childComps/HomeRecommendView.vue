<!--  -->
<template>
  <div class='recommend'>
    <div class='recommend-item' v-for='item in recommends' :key='item.image'>
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'HomeRecommendView',
    props: {
      recommends: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    font-size: 12px;
    text-align: center;
    padding: 15px 0;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex: 1
  }
  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 8px;
  }
</style>