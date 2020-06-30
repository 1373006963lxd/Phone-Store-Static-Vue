# phone_store

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
computed是在DOM执行完成后立马执行（如：赋值）
created执行时挂载阶段还没有开始，模版还没有渲染成html，所以无法获取元素。created钩子函数主要用来初始化数据。
mounted钩子函数一般用来向后端发起请求，拿到数据后做一些业务处理。该函数在模版渲染完成后才被调用。DOM操作一般是在mounted钩子函数中进行。
methods方法有一定的触发条件，如click等。
watch用于检测vue实例上数据的变动
默认加载的时候先computed再watch，不执行methods；等触发某一事件后，则是：先methods再watch。

所有方法都应该在methods里定义，在mounted或created里面使用this调用，用这种方法实现初始化。

```
