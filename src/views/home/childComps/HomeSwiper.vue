<template>
  <div>
    <swiper>
      <swiper-item v-for='item in banners' :key='item.image'>
        <a :href="item.link">
          <img :src="item.image" alt="" @load='imageLoad' />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper"
import SwiperItem from "components/common/swiper/SwiperItem"

  export default {
    name:'HomeSwiper',
    data() {
      return {
        isRoad: false
      }
    },
    components: {
      Swiper, 
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    methods: {
      imageLoad() {
        if(!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true        
        }
      }
    }
  }
</script>

<style scoped>

</style>