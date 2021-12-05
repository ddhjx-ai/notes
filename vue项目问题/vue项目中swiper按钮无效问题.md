```vue
<template>
    <div class="swiper-c">
      <swiper :auto-update="true" class="actor-list" ref="mySwiper"  :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item,index) in list" :key="index">
            <div class="buttom-time">2019-7-31</div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next iconfont icon-widget-shuangjiantouyou" @click="prev"></div>
      <div class="swiper-button-prev iconfont icon-widget-shuangjiantouzuo" @click="next"></div>
    </div>
</template>
 
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 10,
        slidesPerGroup: 6,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  watch: {},
  mounted () {
  },
  computed: {},
  methods: {
    prev () {
      this.$refs.mySwiper.$swiper.slidePrev()
    },
    next () {
      this.$refs.mySwiper.$swiper.slideNext()
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../../assets/css/swiper-bundle.min.css";
</style>
```

