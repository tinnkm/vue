<template>
<div class="index-wrap">
  <div class="index-left">
    <div class="index-left-block">
      <h2>全部产品</h2>
      <template v-for="(product,index) in productList">
        <h3 :key="'title'+index">{{ product.title }}</h3>
        <ul :key="'produclist'+index">
          <li :key="'item'+i"  v-for="(item,i) in product.list" :url="item.url" >
            {{ item.name }}
            <span v-if="item.hot" class="hot-tag">HOT</span>
          </li>
        </ul>
        <div :key="'hr'+index" v-if="index == productList.lenght" class="hr" />
      </template>
    </div>
    <div class="index-left-block lastest-news">
      <h2>最新消息</h2>
        <ul>
          <li :key="'newList'+index" v-for="(item,index) in newsList" :url="item.url" >
            <a :href="item.url" class="new-item">{{ item.name }}</a>
          </li>
        </ul>
    </div>
  </div>
  <div class="index-right">
    <slider-view :sliders="sliders" :inv="3000" @onchange="hanlderChange"></slider-view>
    <div class="index-board-list">
      <div class="index-board-item" :key="'board'+index" v-for="(board,index) in boardList" :class="[{'line-last':index%2 != 0},'index-board-'+board.id]">
        <div class="index-board-item-inner">
          <h2>{{ board.title }}</h2>
          <p>{{ board.description }}</p>
          <router-link :to="{ path: '/detail/'+board.toKey}">
            <div class="index-board-button">
              立即购买
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import sliderView from '@/components/slider.vue'
export default {
  components: {
    sliderView
  },
  created () {
    // ajax请求
    this.$http.get('/api/getNewsList').then(
      (res) => {
        this.newsList = res.data
      },
      (err) => console.log(err)
    )
  },
  name: 'Index',
  methods: {
    hanlderChange (data) {
      // console.log(data);
    }
  },
  data () {
    return {
      sliders: [
        {
          // 当图片作为模块引用时需要使用require，否则找不到图片
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'xxx3',
          href: 'http://xxx.xxx.com'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ],
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          id: 'car',
          toKey: 'analysis',
          saleout: false
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更好地找到定位',
          id: 'earth',
          toKey: 'count',
          saleout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永远保持最前端的速度',
          id: 'loud',
          toKey: 'forecast',
          saleout: true
        },
        {
          title: '勇攀高峰',
          description: '帮你勇闯高峰，到达事业的顶峰',
          id: 'hill',
          toKey: 'publish',
          saleout: false
        }
      ],
      newsList: [],
      productList: {
        pc: {
          title: 'pc产品',
          list: [{
            name: '产品1',
            url: 'https://www.baidu.com',
            hot: true
          }, {
            name: '产品2',
            url: 'https://www.baidu.com'
          }, {
            name: '产品2',
            url: 'https://www.baidu.com'
          }, {
            name: '产品3',
            url: 'https://www.baidu.com'
          }]
        },
        app: {
          title: '移动端产品',
          list: [{
            name: '产品1',
            url: 'https://www.baidu.com'
          }, {
            name: '产品2',
            url: 'https://www.baidu.com'
          }, {
            name: '产品2',
            url: 'https://www.baidu.com'
          }, {
            name: '产品3',
            url: 'https://www.baidu.com'
          }]
        }
      }
    }
  }
}
</script>
<style scoped>
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.index-left {
  float: left;
  width: 300px;
  text-align: left;
}

.index-right {
  float: left;
  width: 900px;
}

.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}

.index-left-block .hr {
  margin-bottom: 20px;
}

.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}

.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}

.index-left-block ul {
  padding: 10px 15px;
}

.index-left-block li {
  padding: 5px;
}

.index-board-list {
  overflow: hidden;
}

.index-board-item {
  float: left;
  width: 440px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}

.index-board-car .index-board-item-inner {
  background: url(../assets/images/1.png) no-repeat;
}

.index-board-loud .index-board-item-inner {
  background: url(../assets/images/2.png) no-repeat;
}

.index-board-earth .index-board-item-inner {
  background: url(../assets/images/3.png) no-repeat;
}

.index-board-hill .index-board-item-inner {
  background: url(../assets/images/4.png) no-repeat;
}

.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}

.line-last {
  margin-right: 0;
}

.index-board-button {
  margin-top: 20px;
  background: #4fc08d;
  color: #fff;
  height: 30px;
  width: 100px;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
}

.lastest-news {
  min-height: 467px;
}

.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  /* 以下两个属性设置超出不换行 */
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
