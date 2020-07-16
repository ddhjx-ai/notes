#### 1. amd、commonjs、esmodule模块化的差异

- amd 是 requireJS 在推广过程中对模块的规范化阐述，是一个概念
  - amd推崇依赖前置，依赖必须一开始就写好
- cmd 是 seaJS 在推广过程中对模块定义的规范化的阐述
  - cmd 推崇依赖就近，内部用到某个模块再去进行单独的引入
- esmodule 是一种静态引入，不能根据逻辑引入不同的功能模块

#### 2.图片上传到服务器流程(FileReader.readAsDataURL)

