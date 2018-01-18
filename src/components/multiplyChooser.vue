<template lang="html">
  <div class="chooser-component">
    <ul class="chooser-list">
      <li :key="index" v-for="(item,index) in selections" @click="chosenSelection(index)" :title="item.text" :class="{active:checkActive(index)}">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
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
      currentIndexList: []
    }
  },
  methods: {
    chosenSelection (index) {
      if (this.currentIndexList.indexOf(index) === -1) {
        this.currentIndexList.push(index)
      } else {
        this.currentIndexList = _.remove(this.currentIndexList, (ids) => {
          return ids !== index
        })
      }
      let selectedList = _.map(this.currentIndexList, (ids) => {
        return this.selections[ids]
      })
      this.$emit('on-change', selectedList)
    },
    checkActive (index) {
      return this.currentIndexList.indexOf(index) > -1
    }
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
