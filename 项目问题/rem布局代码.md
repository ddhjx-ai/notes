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

