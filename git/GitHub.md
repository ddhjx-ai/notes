## 1.git命令

1.  ll : 当前目录下得到所有文件
2.  ls -lA :当前目录的带隐藏资源的所有文件
3.  ll .git : 查找 .git 文件夹下的所有文件
4.  cat <文件名> ：查看指定文件内容
5.  git init : 本地库初始化，生成一个隐藏 .git 文件；改文件目录中存放的是本地库相关的子目录和文件；不要修改和删除
6. git status : 状态查看（文件提交之后，又被修改了，也会检测到状态的改变）
7.  git add <文件名> : 将文件添加到暂存区
8. git rm --cached  <文件名> ： 将文件从暂存区移除
9. git commit <文件名> ： 将文件提交
10. git log：查看提交记录
11. git reflog：查看所有的历史记录（包括历史区回滚后的）
12.  git update-git-for-windows：git升级

## 2. GIT版本控制系统

> 版本控制系统：
>
> 1. 记录历史版本信息（记录每一次修改的记录）
> 2. 方便团队相互之间协作开发
>
> 常见的版本控制系统：
>
> - cvs、svn：集中式版本控制系统
> - git：分布式版本控制系统

git的好处：

- 无需联网也能记录和查看历史版本信息
- 无需过多依赖中央仓库，每个人本地也有全部的信息
- 向中央仓库传输内容依托的是文件流传输，速度比SVN快很多

## 3.Git工作原理

- 工作区：我们能看到的，并且用来写代码的区域
- 暂存区：临时存储用的
- 历史区：生成历史版本



## 4.git提交步骤：

#### 1.GIT的全局配置

```shell
$ git config -l 查看配置信息
$ git config --global -l 查看全局的配置信息

配置全局信息：用户名和邮箱(可以用来修改)
git config --global user.name xxxx
git config --global user.email xxxxx
```

#### 2.创建仓库完成版本控制

> 创建本地`git`仓库

```javascript
git init   
=> 生成一个隐藏 .git 文件夹（这个文件夹不要删除，因为暂存区和历史区还有一些其他信息都在里面）
```

> 在本地本代码编写完成之后，把文件提交到暂存区

```shell
git add <文件名>		// 提交指定文件名的文件提交到暂存区
git add .  或者  git add -A   // 提交文件夹下所有文件提交到暂存区

git status 查看当前文件夹中所有文件的状态（红色表示在工作区，绿色表示已经在暂存区，没有内容则说明说有修改的信息都已经提交到历史区）
git rm --catched <文件名>：将文件从暂存区撤回
```

>将暂存区的内容提交到历史区

```shell
git commit -m"描述信息：本次提交内容的描述"

查看历史记录，包含历史信息和版本号
git log
git reflog    所有历史记录，包含回滚信息
```

> 获取指定版本的内容（回滚）

```shell
git reset --hard <版本号>    版本号可以通过历史记录获取
```



## 5.git-hub

>GIT-HUB：是一个网站(一个开源的源代码管理平台)
>
>​	用户注册之后，可以在自己账户下创建仓库，用来管理项目的源代码（源代码是基于git传到仓库中的）

1. Setting 用户设置

   - Profile 修改自己的基本信息
   - Account 修改用户名
   - Security 修改密码
   - Emails 邮箱

2. 创建仓库

   - new repository -> 填写信息 -> Create repository

   Setting  -> 删除仓库  Delete this repository

   ​			 -> Collaborators 设置写作开发人员

   Code 可以查看历史版本信息和分支信息

3. 将本地仓库信息提交到远程仓库

   ```shell
   // 创建本地仓库和远程仓库的连接
   git remote -v       查看本地仓库和那些远程仓库保持连接
   git remote add origin <git仓库地址>			让本地仓库和远程仓库新建一个连接，origin是一个任意的链接名，可以自定义
   git remote rm origin 			删除关联
   ```

   ```shell
   提交之前最好先拉取
   git pull origin master   获取其他成员更新到同一仓库中的文件
   将本地代码提交到远程仓库(需要输入github的用户名密码)
   git push origin master
   ```
   
   ```shell
   git clone <远程仓库git地址> <别名：可以不设置，默认是仓库名>
   ```
   
   

## 6.首次提交一个项目的步骤

1. **git init** 创建一个空仓库，生成 .git 文件夹
2. **git add .**  提交到暂存区
3. **git commit -m"描述信息"**    提交到历史区
4. **git remote add origin <github远程仓库地址>**   将历史区信息和远程仓库连接
5. **git push origin master**   将本地历史区信息同步到github上

### 二次提交

1. **git add .**  将新文件或者修改后的文件提交到暂存区
2. **git commit -m"描述信息"**     提交到历史区
3. **git pull origin master**   提交到远程仓库之前，建议先 pull
4. **git push origin master**  提交到远程仓库
5. **git reset --hard <版本号>**   拉取指定版本号的历史文件，版本号可以通过`git reflog`获取

## 7.真实项目开发流程

1. 创建中央仓库
2. git clone 将远程仓库及默认的内容克隆一份到本地；git clone 解决了三件事情
   1. 初始化一个本地仓库`git init`

## 8.合并分支

1. **创建分支：git checkout -b login**		执行该命令之后就会创建一个新分支，并切换到当前login分支上
   1. 查看分支：git   branch  查看当前项目的所有分支，其中master也可以看做是项目的一个分支
2. **合并分支：**
   1. **切换到要合并到的分支：git   checkout  master**    切换到 master 分支，
   2. **合并分支：git  merge  login**     此时该分支上的代码就合并到 master分支上
   3. **推送代码：**git push         此时远程仓库只会有一个 master 分支
3. **将 login 分支也推送远程仓库：git  push  -u  origin  login** 

```shell
1，先提交自己本地分支的代码到远程
2，切换到本地development分支 ： git checkout development
3,同步远程development分支的代码到本地，保证本地的development合远程的代码一致： git pull origin development
4,合并远程自己的分支：git merge origin/你自己的分支名称
    （假如有冲突时，先解决冲突，然后使用git add . 和git commit -m "注释"，再继续下面的步骤）
5，提交到远程development分支：git push origin development
6,切回自己的本地分支： git checkout 你自己的分支
7，将自己本地的代码和远程development的代码同步： git pull origin development
```

