<template lang="html">
  <div class="">
    <my-dialog :isShow="showCheckOrderDialog" @close="handleCheck">
      <div class="">
        请检查你的支付状态
      </div>
      <div class="button" @click="handleCheck">
        支付成功
      </div>
      <div class="button" @click="handleCheck">
        支付失败
      </div>
    </my-dialog>
    <my-dialog :isShow="showSuccessDialog" @close="toOrderList">支付成功</my-dialog>
    <my-dialog :isShow="showFailedDialog" @close="toOrderList">支付失败</my-dialog>
  </div>
</template>

<script>
import myDialog from '@/components/dialog.vue'
export default {
  components: {
    myDialog
  },
  props: {
    showCheckOrderDialog: {
      type: Boolean,
      default () {
        return false
      }
    },
    orderId: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      showSuccessDialog: false,
      showFailedDialog: false
    }
  },
  methods: {
    handleCheck () {
      this.$http.get('api/checkOrder/' + this.orderId).then((res) => {
        if (res.data.exist) {
          this.showSuccessDialog = true
        } else {
          this.showFailedDialog = true
        }
      }, (err) => {
        this.showSuccessDialog = false
        this.showFailedDialog = true
        console.log(err)
      })
      this.$emit('close')
    },
    toOrderList () {
      this.$router.push('/orderList')
    }
  }
}
</script>

<style lang="css">
</style>
