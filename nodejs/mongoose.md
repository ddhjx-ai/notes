## mongoose

### 1.安装

```shell
npm init -y
npm i mongoose
```

hello world:

```javascript
var mongoose = require('mongoose')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

// 创建一个模型，就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计自己的数据库就可以了
// mongoose 这个包可以让设计编写过程变得非常的简单
const Cat = mongoose.model('Cat', { name: String });

// 实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });

// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));
```

### 2.官方指南

#### 2.1.设计 Schema 发布 Model

```javascript
var mongoose = require('mongoose')

// Mongoose中的所有内容都以Schema开头。每个模式都映射到MongoDB集合，并定义该集合中文档的形状。
var Schema  = mongoose.Schema

// 1.连接数据库
// 指定连接的数据库不需要存在，当插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/itcast')

// 2.设计文档结构
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据
var userSchema = new Schema({
    username : {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
    }
})

// 3.将文档结构发布为模型
// mongoose.model() 方法就是用来讲一个架构发布为 model
//      参数一：传入一个大写名词单数字符串用来表示数据库的名称
//          mongoose 会自动将大写名词的字符串生成 小写复数 的集合名词
//          例如：这里的 User 最终会变为 users 集合名称
//      参数二：架构 Schema
//      返回值：模型构造函数
var User = mongoose.model('User', userSchema);

// 4.当有了模型构造函数，就可以用这个构造函数对 users 集合中的数据进行 增删改查

```

#### 2.2.增加数据

```javascript
var admin = new User({
    username : 'admin',
    password : '123456',
    email:'admin@admin.com'
})

// 数据持久化
admin.save(function(err,data){
    if(err){
        console.log('存储失败')
    }else{
        console.log('存储成功')
        console.log(data)
    }
})
```

#### 2.3.查询数据

查询所有：

```javascript
User.find(function(err,data){
    if(err){
        console.log('查询失败')
    }else{
        console.log(data)
    }
})
```

按条件查询所有：

```javascript
User.find({
    username:'zs'
},function(err,data){
    if(err){
        console.log('查询失败')
    }else{
        console.log(data)
    }
})
```

按条件查询一个：	

```javascript
User.findOne({
    username:'zs',
    password:'123456'
},function(err,data){
    if(err){
        console.log('查询失败')
    }else{
        console.log(data)
    }
})
```

#### 2.4.删除数据

```javascript
// deleteOne() 和 deleteMany()
User.deleteOne({
    username:'zs'
}, function (err) {
    if(err){
        console.log('删除失败')
    }else{
        console.log('删除成功')
    }
});
```

根据条件删除一个：

```javascript
Model.findOneAndRemove(conditions,[options],[callback])
```

根据 id 删除一个：

```javascript
MOdel.findByIdAndRemove(id,[options],[callback])
```

#### 2.5.更新数据

```javascript
User.findByIdAndUpdate(
    "5d5a525201c303283474e9af",
    {
        password:'123'
    },function(err,data){
    if(err){
        console.log('更新失败')
    }else{
        console.log('更新成功')
        console.log(data)
    }
})
```

根据条件更新所有：

```javascript
MOdel.update(conditions,doc,[options],[callback])
```

根据指定条件更新一个

```javascript
Model.findOneAndUpdate([conditions],[update],[options],[callback])
```

