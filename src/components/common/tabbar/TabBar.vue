<!--  -->
<template>
  <div id="tab-bar">
    <slot />
  </div>
</template>

<script>
  export default {
    name:'TabBar'
  }
</script>

<style scoped>
  #tab-bar {
    background-color: #f6f6f6;
    display: flex;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0px;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
  }
</style>
