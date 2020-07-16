```javascript
(function(){
    let evt = 'onorientationchange' in window ? 'orientationchange' : 'resize'
    
    function computed(){
        let html = document.documentElement
        deviceW = html.clientWidth
        designW = 750
        ratio = deviceW / designW * 100
        if(deviceW >= designW) ratio = 100
        html.style.fontSize = ratio + 'px'
    }
    computed()
    window.addEventListener(evt,computed)
})()
```

```javascript
(function rem(window){
  const doc = window.document
  const docEl = doc.documentElement
  let tid
  let dpr = 0
  let scale = 0
  const metaEl = doc.querySelector('meta[name="viewport"]')
  console.log(metaEl)

  if(metaEl){
    // initial-scale:页面首次被显示是可视区域的缩放级别，取值1.0则页面按实际尺寸显示，无任何缩放
    const match = metaEl.getAttribute('content').match(/initial-scale=(\d\.+)/)
    console.log(match)
    if(match){
      scale = parseFloat(match[1])
      dpr = parseInt(1/scale)
    }
  }

  // navigator.appVersion:属性可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
  const isIphoe = window.navigator.appVersion.match(/iphone/gi) 
  console.log(isIphoe)
  // window.devicePixelRatio:返回当前显示设备的物理像素分辨率与 CSS 像素分辨率的比率
  const devicePixelRatio = window.devicePixelRatio
  
  if(isIphoe){
    if(devicePixelRatio >= 3 && (!dpr || dpr >= 3)){
      dpr = 3
    }else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
      dpr = 2
    }else{
      dpr = 1
    }
  }
  docEl.setAttribute('data-dpr',dpr)

  const refreshRem = function(){
    // object.getBoundingClientRect:返回当前元素相对视窗的位置集合
    let width = docEl.getBoundingClientRect().width
    if(width > 750){
      width = 750
    }else if(width < 320){
      width = 320
    }
    // 设置窗口大小为 375px 的时候，1rem=100px
    const rem = width / 3.75
    docEl.style.fontSize = rem + 'px'

    window.addEventListener('resize',()=>{
      clearTimeout(tid)
      tid = setTimeout(refreshRem,300)
    })
    // onpageshow 事件在用户浏览网页时触发。
    // onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。
    window.addEventListener('pageshow',(e)=>{
      console.log(e)
      // event.persisted从缓存冲获取时为true否则为false
      if(e.persisted) {
        clearTimeout(tid)
        tid = setTimeout(refreshRem,300)
      }
    })

    // document.readyState:属性返回当前文档的状态
    // uninitialized:还未开始载入;loading:载入中;interactive:已加载，文档与用户可以开始交互;complete:载入完成
    if(doc.readyState === 'complete'){
      doc.body.style.fontSize = '14px'
    }else{
      // DOMContentLoaded事件：dom内容加载完毕触发
      doc.addEventListener("DOMContentLoaded",()=>{
        doc.body.style.fontSize = '14px'
      })
    }
  }

  refreshRem()
})(window)
```

