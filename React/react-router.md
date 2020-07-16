npm install react-router-dom

### 1.路由组件

1. <BrowserRouter>
2. <HashRouter>
3. <Route>
4. <Redirect>
5. <Link>
6. <NavLink>
7. <Switch>

#### 1.路由器

<BrowserRouter>、<HashRouter>

#### 2.路由

<Route path='路由路径' component={路由组件}>

#### 3.路由链接

<Link to='路由路径'></Link>

<NavLink to='路由路径' activeClassName='显示当前组件的路由类名'></NavLink>

#### 4.路由性能优化

- React 路由中默认是模糊匹配，当有多个路由的时候，会一次从上往下匹配，中阿金即使匹配成功，也不会停止匹配
- <Switch>组件，一旦匹配成功就停止匹配

#### 5.路由重定向 <Redirect>

- <Redirect to='重定向之后的路由路径'> ：不配合 Switch 时有强制性，每次都会重定向
- 通常都会和 Switch 组件一起使用，
- <Redirect from='重定向之前的路由' to='重定向之后的路由路径'>
- Redirect 路由组件不要放在路由的最前边，通常放在最后

#### 6. 在二级路由下刷新外部样式丢失(BrowserRouter)

1. 使用 HashRouter 组件
2. <link rel="stylesheet" href="%PUBLIC_URL%/bootstrap.css">

#### 7.React 路由组件传参

- params 传参
  1. 注册路由：<Route path='路由路径/:key' component={路由组件}>	
  2. 请求路由：<Link to='路由路径/value'>
  3. 组件内部获取参数数据：this.props.match.params.key = value
- props 传参
  1. <Route path='路由路径'  render={() => <News key=value/>}></Route>
  2. 请求路由：<Link to='路由路径'>
  3. 组件内部获取参数数据：this.props.key = value

