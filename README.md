# demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## Build to Tomcat
### step 1:modify the config/index.js
<pre><code>
build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
	// 当需要发布到tomcat的时候，这里需要修改为要发布的根目录assetsPublicPath: '/dist/',
    assetsPublicPath: '/',
  }
</code></pre>
### step 2:if you used the router modify the router/index.js
<pre><code>
export default new Router({
  mode: 'history',
  // 当需要发布道tomcat目录时如果没有配置文件的访问路径不是主路径即/，则需要添加 base: '/dist/',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }
  ]
})
</code></pre>
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## when can't get the post params
### step1: install qs
  this is a data formatter plugins
  <pre>
    <code>npm install qs</code>
  <pre>
### step2: change the contentType
  set the contentType 'application/x-www-form-urlencoded; charset=UTF-8'
### step3: formatter data
  qs.stringify()
<pre>
<code>
import Qs from 'qs'
// 由于vue-resouce框架限制需修改contentType和格式化参数后端（springboot）才能接收到
this.$http.post('http://192.168.130.89:8080/login', Qs.stringify({username: 'oaadmin', password: '123456'}),
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).then(
      (res) => {
        let data = res.body
        console.log(data)
      }
    )
</code>
</pre>
