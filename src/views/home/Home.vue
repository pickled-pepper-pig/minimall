<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
      ref="tabControl1"
      class="tab-control"
    />

    <scroll
      class="content"
      :probe-type="3"
      @scroll="contentScroll"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";

import HomeSwiper from "views/home/childComps/HomeSwiper";
import HomeRecommendView from "views/home/childComps/HomeRecommendView";
import HomeFeatureView from "views/home/childComps/HomeFeatureView";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodList,
    Scroll,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null
    };
  },

  created() {
    this.getHomeMultiData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mixins: [itemListenerMixin, backTopMixin],

  methods: {
    //     debounce(func, delay) {
    //       let timer
    //       return function(...args) {
    //         if(timer) clearTimeout(timer)
    //         timer = setTimeout(() => {
    //           func.apply(this, args)
    //         },delay)
    //       }
    //     },

    getHomeMultiData() {
      return getHomeMultiData().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        // console.log(this.recommends)
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      // console.log(page)
      return getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
      });
      this.$refs.scroll.finishPullUp(); // 要结束上拉
    },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    loadMore() {
      // console.log('上拉加载')
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },

  computed: {
    showGoods() {
      // console.log(this.goods[this.currentType].list)
      return this.goods[this.currentType].list;
    },
  },

  activated() {
    // console.log(this.saveY)
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },

  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },

  // created() {
  //   console.log("home created")
  // }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
}
.content {
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  overflow: hidden;
  position: absolute;
}
.tab-control {
  z-index: 9;
  position: relative;
  background-color: #fff;
  font-size: 16px;
}
</style>