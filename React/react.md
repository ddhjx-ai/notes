## 1.React 起步

- npm i -g create-react-app 安装脚手架
- create-react-app xxx  基于脚手架创建项目
- npm start/build  启动项目/生成项目



## 2.React 生命周期函数

```javascript
import React,{Component} from "react"
export default class react extends Component{
    state = {}
	constructor(props){
        super(props)
        // 常用于初始化状态
    }
    componentWillMount(){	// 组件将要挂载
        // 此时可以访问状态和属性，可进行api调用
        // 这里可以发送ajax请求和开启定时器，但是建议不要在这里发送请求，或者放置运算量特别大的代码，会导致首页渲染时间延长，用户体验差
        console.log(this.state)
    }
    componentDidMount(){	// 组件已挂载
        // 组件已挂载，可进行状态更新操作
        // ajax 请求数据的操作最好放在这里进行
        console.log(this.state)
    }
    componentWillReceiveProps(){	// 将要接收属性传递
        // 父组件传递的属性有变化，做相应的响应
    }
    shouldComponentUpdate(nextProps,nextState){	// 组件是否需要更新
        // 组件是否需要更新，需要返回布尔值结果
        return true
    }
    componentWillUpdate(){	// 组件将要更新
        // 组件将要更新，可做更新统计
    }
    componentDidUpdate(){
        // 组件已经更新
    }
    componentWillUnmount(){	// 组件将要卸载
        // 组件将要卸载，可做清理工作
    }
    render(){
        // 组件渲染
        // 提供虚拟DOM，可能会调用多次。
        return <div>react组件的生命周期函数</div>
    }
}
```

```shell
	1.初始化
        触发条件：ReactDOM.render(<MyComponent/>)
        constructor()
        componentWillMount()
        render():提供虚拟DOM，可能会调用多次。
        componentDidMount()：启动定时器、发送Ajax请求、只执行一次。
    2.更新
        触发条件：this.setState({})
        componentWillUdate()
        render()
        componentDidUpdate()
    3.卸载:
        触发条件：ReactDOM.unmountComponentAtNode()
        componentWillUnmount()：收尾工作，例如：清除定时器，只执行一次。
```

## 3.React中的虚拟DOM  DIFF算法(different)

- React将真实的DOM树映射出一个虚拟的DOM对象树
- 每次setState的时候会产生一个新的虚拟DOM对象树
- 将新的对象树和旧的对象树进行对比，找出变化的部分，局部渲染变化的部分
- 实现的效果：最小化页面重绘，提高性能

## 4.React中遍历生成多个个体(item)的时候添加的key属性的作用

1. key是当前个体的唯一标识
2. 当数据发生改变的时候就是通过对应的key去对比
3. 对比的过程中有几种场景
   1. key对应的item没有改变，item中的数据也没有变，就直接使用原来的item，不去重新渲染
   2. key对应的item没有变，item中的数据变了，只需要渲染item中的数据即可
   3. key对应的item变了，先去销毁之前key对应的item，然后渲染key对应的当前的item

## 5. pubsub-js 发布订阅模式

1. 下载：npm install pubsub-js
2. 引入：import PubSub from 'pubsub-js'
3. 获取数据：
   - PubSub.subscribe('msg'，callback(msg, data))	获取数据
   - PubSub.publish('msg', data)    提供数据