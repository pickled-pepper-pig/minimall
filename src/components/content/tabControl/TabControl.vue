<!--  -->
<template>
  <div class='tab-control'>
    <div v-for='(item, index) in titles'
         class='tab-control-item'
         :key='item'
         @click="itemClick(index)"
         :class='{active: index===currentIndex}'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:'TabControl',
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
  }
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active {
    color: var(--color-high-text);  
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);    
  }
</style>