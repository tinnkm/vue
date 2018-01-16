<template>
<div class="layout">
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <MenuItem name="1">
          <Icon type="ios-navigate"></Icon>
          Item 1
          </MenuItem>
          <MenuItem name="2">
          <Icon type="ios-keypad"></Icon>
          Item 2
          </MenuItem>
          <MenuItem name="3">
          <Icon type="ios-analytics"></Icon>
          Item 3
          </MenuItem>
          <MenuItem name="4">
          <Icon type="ios-paper"></Icon>
          Item 4
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Content>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </Content>
    <Footer>this is footer</Footer>
  </Layout>
</div>
</template>

<script>
// import {  } from 'vue-strap'
export default {
  name: 'Leyout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keypath) {
      console.log(key, keypath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
