<!--  -->
<template>
  <div id="detail">
    <!-- <detail-nav-basr :titles='titles'> -->
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods-info="goodsInfo" />
      <detail-shop-info :shop-info="shopInfo" />
      <detail-image-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-params-info ref="paramsRef" :paramsInfo="paramsInfo" />
      <detail-comment-info ref="commentRef" :commentInfo="commentInfo" />
      <goods-list ref="recommendRef" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addCart" />

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import detailSwiper from "./childComps/DetailSwiper";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailShopInfo from "./childComps/DetailShopInfo"; //店铺信息组件
import DetailImageInfo from "./childComps/DetailImageInfo.vue"; //商品图片详细信息
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue"; //商品参数信息组件
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"; //商品的评论信息
import DetailBottomBar from "./childComps/DetailBottomBar.vue"; //底部商品导航
import GoodsList from "components/content/goods/GoodList";
import Toast from "components/common/toast/Toast";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      titles: ["商品", "参数", "评论", "推荐"],
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      paramsInfo: {}, //商品参数信息
      detailInfo: {}, //商品详情信息
      commentInfo: {}, //商品评论信息
      recommend: [], //商品推荐数据
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    detailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
  },

  mixins: [itemListenerMixin, backTopMixin],

  created() {
    this.iid = this.$route.params.iid;
    // console.log(this.iid)
    getDetail(this.iid).then((res) => {
      const results = res.data.result;
      // console.log(res.data)
      // 1.获取轮播数据
      this.topImages = results.itemInfo.topImages;
      // 2.获取商品信息
      this.goodsInfo = new Goods(
        results.itemInfo,
        results.columns,
        results.shopInfo.services
      );
      this.shopInfo = new Shop(results.shopInfo);
      this.detailInfo = results.detailInfo;
      this.paramsInfo = results.itemParams;
      if (results.rate.cRate !== 0) {
        //因为有的商品没有评论信息，所以这里要做一个判断
        this.commentInfo = results.rate.list[0];
      }
      getRecommend().then((res) => {
        const list = res.data.data.list;
        // console.log(typeof(list))
        // this.recommend = list;
        // console.log(this.recommend)
        let temp = [];
        for (let i in list) {
          temp.push(list[i]);
          // console.log(typeof(temp))
        }
        this.recommend = temp;
        // console.log(temp)
      });

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.paramsRef.$el.offsetTop);
        this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommendRef.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs)
      }, 100);
    });
  },
  methods: {
    ...mapActions(["addCarts"]),
    imageLoad() {
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      // console.log(position)
      const positionY = -position.y;
      // for(let i in this.themeTopYs) {
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if((positionY > this.themeTopYs[i]) && (positionY < this.themeTopYs[i + 1])) {
        //   console.log(i)
        // }
        // if(i < length - 1) {
        //   if((positionY > this.themeTopYs[i]) && (positionY < this.themeTopYs[i + 1])) {
        //     console.log(i)
        //   }
        // } else {
        //   if(positionY > this.themeTopYs[i]) {
        //     console.log(i)
        //   }
        // }
        // positionY 在 0 到 themeTopYs[1] 之间，index = 0
        // positionY 在 themeTopYs[1] 到 themeTopYs[2] 之间，index = 1
        // positionY 在 themeTopYs[2] 到 themeTopYs[3] 之间，index = 2
        // positionY 超过 themeTopYs[3]，index = 3
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    addCart() {
      // 1.获取商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.newPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车内
      // this.$store.carList.push(product)   这种方法不可取，应该通过修改mutations来改变state
      // this.$store.commit('addCart', product)
      // 放入actions中
      this.addCarts(product).then((res) => {
        this.$toast.show(res);
        // console.log(this.$toast);
      });

      // 3.添加到购物车成功
    },
  },
  mounted() {
    this.$bus.$on("itemImageload", () => {
      // console.log(this.$refs.scroll.refresh)
      refresh();
    });
    // const refresh = this.debounce(this.$refs.scroll.refresh, 500)
    const refresh = debounce(this.$refs.scroll.refresh, 500);
  },
};
</script>

<style scoped>
#detail {
  z-index: 9;
  position: relative;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 49px;
  overflow: hidden;
}
/* .footer_bar {
  position: relative;
  z-index: 999;
} */
</style>