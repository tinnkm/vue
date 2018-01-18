<template>
<div class="layout" @click="componentEvent">
  <Layout>
    <Header>
      <Menu @on-select="show" mode="horizontal" theme="dark" active-name="1">
        <router-link :to="{ path: '/'}">
          <div class="layout-logo">
          </div>
        </router-link>
        <div class="layout-nav">
          <menu-item v-if="username !== ''" name="用户名">
          {{ username }}
          </menu-item>
          <menu-item v-if="username === ''" name="登录" >
          <Icon type="ios-navigate"></Icon>
          登录
          </menu-item>
          <menu-item v-else name="注销">
            注销
          </menu-item>
          <menu-item name="注册">
          <Icon type="ios-keypad"></Icon>
          注册
          </menu-item>
          <menu-item name="关于">
          <Icon type="ios-analytics"></Icon>
          关于
          </menu-item>
          <menu-item name="联系我们">
          <Icon type="ios-paper"></Icon>
          联系我们
          </menu-item>
        </div>
      </Menu>
    </Header>
    <Content>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </Content>
    <Footer class="footer">this is footer</Footer>
  </Layout>
  <my-dialog :isShow="showDialog" @close="handlerClose" :title="dialogTitle">
    <p :is="currentComponent" @loginSuccess="loginCallBack">
    </p>
  </my-dialog>
</div>
</template>

<script>
import myDialog from '@/components/dialog.vue'
import LoginForm from '@/components/LoginForm.vue'
import { eventBus } from '@/eventBus'
export default {
  components: {
    myDialog,
    LoginForm
  },
  name: 'Leyout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeIndex: '1',
      showDialog: false,
      dialogTitle: '',
      currentComponent: '',
      username: ''
    }
  },
  methods: {
    handleSelect (key, keypath) {
      console.log(key, keypath)
    },
    show (name) {
      switch (name) {
        case '登录':
          this.currentComponent = LoginForm
          break
        case '注销':
          this.logout()
          break
        default:
          this.currentComponent = ''
      }
      this.dialogTitle = name
      if (name !== '注销' && name !== '用户名') {
        this.showDialog = true
      }
    },
    handlerClose () {
      this.showDialog = false
    },
    loginCallBack (name) {
      this.username = name
      this.showDialog = false
    },
    logout () {
      this.username = ''
    },
    componentEvent () {
      eventBus.$emit('drop-selection')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  background: #b4babf;
  text-align: center;
  position: relative;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
