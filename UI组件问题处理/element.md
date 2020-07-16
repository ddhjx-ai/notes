#### 1.element-ui中的table可分页多选功能

- 在el-table中添加`:row-key="getRowKeys"`

```javascript
<el-table
      ref="form"
      :model="form"
      :row-key="getRowKeys"
      ........
```

- 然后第一列，即有多选框的一列，添加`:reserve-selection="true"`

```html
<el-table-column type="selection" :reserve-selection="true"></el-table-column>
```

- 然后在`methods`中添加函数

```javascript
getRowKeys(row) {
	return row.id
}
```

