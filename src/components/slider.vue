<template>
<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
  <div class="slide-img">
    <a :href="sliders[current].url">
      <transition :name="forward?'slide-trans':'slide-trans-back'">
        <img v-if="isShow" :src="sliders[current].src" alt="">
      </transition>
      <transition :name="forward?'slide-trans-old':'slide-trans-old-back'">
        <img v-if="!isShow" :src="sliders[current].src" alt="">
      </transition>
    </a>
  </div>
  <h2>title</h2>
  <ul class="slide-pages">
    <li @click="goto(prev)">&lt;</li>
    <li v-for="(item,index) in sliders" @click="goto(index)">
      <a :class="{'on':index === current}">{{ index +1 }}</a>
    </li>
    <li @click="goto(next)">&gt;</li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    sliders: {
      type: Array,
      default: []
    },
    inv: {
      type: Number,
      // 默认两秒
      default: 2000
    }
  },
  data () {
    return {
      current: 0,
      invId: 0,
      isShow: false,
      forward: false
    }
  },
  computed: {
    prev () {
      if (this.current === 0) {
        return this.sliders.length - 1
      } else {
        return this.current - 1
      }
    },
    next () {
      if (this.current === this.sliders.length - 1) {
        return 0
      } else {
        return this.current + 1
      }
    }
  },
  methods: {
    // 判断是否是向前翻页
    isForward (selected) {
      if (selected > this.current) {
        this.forward = true
      } else {
        this.forward = false
      }
    },
    goto (index) {
      // 执行一次就行，延迟10秒触发v-if
      this.isForward(index)
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
        this.current = index
        this.$emit('onchange', this.sliders[index])
      }, 10)
    },
    runInv () {
      this.invId = setInterval(() => {
        this.goto(this.next)
      }, this.inv)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  // 页面加载完后执行
  mounted () {
    this.runInv()
  }
}
</script>

<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}

.slide-trans-enter {
  transform: translateX(900px);
}

.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-trans-back-enter-active{
  transition: all .5s;
}
.slide-trans-back-enter {
  transform: translateX(-900px);
}
.slide-trans-old-back-leave-active {
  transition: all .5s;
  transform: translateX(900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}

.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}

.slide-img {
  width: 100%;
}

.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}

.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}

.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}

.slide-pages li .on {
  text-decoration: underline;
}
</style>
