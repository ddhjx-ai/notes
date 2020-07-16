```html
<div class="toggle-switch">
    <input type="checkbox"/>
    <div class="toggle-switch-content">
        <div class="switch-true">on</div>
        <div class="switch-false">off</div>
    </div>
</div>
```

```css
.toggle-switch {
  display: inline-block;
  position: relative;
  width: 48px;
  height: 24px;
  border-radius: 5px;
}
.toggle-switch input[type="checkbox"] {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0px;
  filter: alpha(opacity=0);
  opacity: 0;
}
.toggle-switch input[type="checkbox"]:checked + .toggle-switch-content {
  border: 1px #48a0df solid;
}
.toggle-switch input[type="checkbox"]:checked + .toggle-switch-content .switch-true {
  display: block;
}
.toggle-switch input[type="checkbox"]:checked + .toggle-switch-content .switch-false {
  background: #959A9D;
  display: none;
}
.toggle-switch-content {
  border: 1px #959A9D solid;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  display: table;
}
.switch-true,
.switch-false {
  width: 50%;
  height: 100%;
  text-align: center;
  padding-top: 3px;
  color: #fff;
}
.switch-true {
  float: left;
  background: #48a0df;
  display: none;
}
.switch-false {
  float: right;
  background: #959A9D;
  display: block;
} 
```

