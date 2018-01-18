<template lang="html">
  <div class="selection-component">
    <div class="selection-show">
      <span>{{ selections[currentIndex].text }}</span>
      <div class="arrow" @click="toggleClick">
      </div>
    </div>
    <div class="selection-list" v-show="isDrop">
      <ul>
        <li v-for="(item,index) in selections" :key="index" @click="handleClick(index)">{{item.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus'
export default {
  props: {
    selections: {
      type: Array,
      default () {
        return {
          text: '',
          value: ''
        }
      }
    }
  },
  data () {
    return {
      isDrop: false,
      currentIndex: 0
    }
  },
  methods: {
    toggleClick (event) {
      // 阻止事件冒泡，防止click事件传播到页面其他地方而触发drop-selection
      event.stopPropagation()
      // 自己触发一次drop-selection来实现当页面有两个selection时，可以点击这个selection来关闭另一个
      eventBus.$emit('drop-selection')
      this.isDrop = !this.isDrop
    },
    handleClick (index) {
      this.currentIndex = index
      // this.isDrop = false
      this.$emit('on-change', this.selections[index])
    }
  },
  mounted () {
    // 在页面初始时监听eventbus发出的事件,当点击页面其他地方的时候收起selection
    eventBus.$on('drop-selection', () => {
      this.isDrop = false
    })
  }
}
</script>

<style scoped>
.selection-component {
  position: relative;
  display: inline-block;
}
.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}
.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
.selection-list li:hover {
  background: #e3e3e3;
}
</style>
