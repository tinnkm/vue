<template lang="html">
<div>
  <div  class="dialog-wrap">
    <div v-show="isShow" class="dialog-cover" @click="closeEvent"></div>
    <transition name="drop">
    <div class="dialog-content" v-show="isShow">
      <p class="dialog-title">{{ title }}</p>
      <p class="dialog-close" @click="closeEvent">X</p>
      <slot>empty</slot>
    </div>
    </transition>
  </div>

</div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    closeEvent () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .5s ease;
}
.drop-enter{
  transform: translateY(-500px);
  opacity: 0;
}
.drop-leave-to {
  transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 50%;
  position: fixed;
  max-height: 61%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: 2px solid #464068;
  padding: 2%;
  line-height: 1.6;
}
.dialog-title {
  position: absolute;
  top: 5px;
  left: 15px;
  font-weight: 300;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
</style>
