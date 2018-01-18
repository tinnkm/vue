<template lang="html">
  <div class="order-list-wrap">
    <div class="query-item">
      选择产品：
    <Select v-model.lazy="params.buyType" style="width:200px">
        <Option v-for="item in buyTypes" :value="item.value" :key="item.value">{{ item.text }}</Option>
    </Select>
    </div>
    <div class="query-item">
      开始日期：
      <DatePicker type="date" placeholder="Select date" style="width: 200px" @on-change="updateParams('beginTime',$event)"></DatePicker>
    </div>
    <div class="query-item">
      结束日期：
      <DatePicker type="date" placeholder="Select date" style="width: 200px" @on-change="updateParams('endTime',$event)"></DatePicker>
    </div>
    <div class="query-item">
      关键词：
      <Input v-model.lazy="params.keyWord" style="width: 200px"></Input>
    </div>
    <div class="result-table">
      <Table :data="tableData" :columns="tableColumns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
              <Page :total="100" :current="1" @on-change="changePage"></Page>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelection from '@/components/selection.vue'
export default {
  components: {
    vSelection
  },
  data () {
    return {
      buyTypes: [
        {
          text: '入门版',
          value: 0
        },
        {
          text: '中级版',
          value: 1
        },
        {
          text: '高级版',
          value: 2
        }
      ],
      params: {
        buyType: '',
        beginTime: '',
        endTime: '',
        keyWord: '',
        row: 10,
        page: 1
      },
      tableColumns: [
        {
          title: 'ID',
          key: 'orderId'
        },
        {
          title: '产品',
          key: 'product'
        },
        {
          title: '使用时间',
          key: 'period'
        },
        {
          title: '购买数量',
          key: 'buyNum'
        },
        {
          title: '购买日期',
          key: 'date'
        },
        {
          title: '金额',
          key: 'amount'
        }
      ]
    }
  },
  watch: {
    'params.buyType' () {
      this.$store.commit('updateParams', this.params)
      this.$store.dispatch('fetchOrderList')
    },
    'params.keyWord' () {
      this.$store.commit('updateParams', this.params)
      this.$store.dispatch('fetchOrderList')
    }
  },
  methods: {
    updateParams (key, value) {
      this.params[key] = value
      this.$store.commit('updateParams', this.params)
      this.$store.dispatch('fetchOrderList')
    },
    changePage (page) {
      this.params.page = page
      this.$store.commit('updateParams', this.params)
      this.$store.dispatch('fetchOrderList')
    }
  },
  computed: {
    tableData () {
      return this.$store.getters.getOrderList
    }
  },
  mounted () {
    this.$store.dispatch('fetchOrderList')
  }
}
</script>

<style scoped>
.order-list-wrap{
  width: 1200px;
 min-height: 800px;
 margin: 20px auto;
 overflow: hidden;
}
.query-item{
  display: inline-block;
padding-left: 15px;
}
.result-table{
   margin-top: 20px;
}
</style>
