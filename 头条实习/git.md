#### 1.git工作流

工作区（add之前）--暂存区（add之后）--远程仓库

##### 1.提交创建新文件，或者修改文件，并提交到仓库，如 new.js，或者修改了new.js

掌握仓库当前的状态,查看修改但没有add的文件:git status
查看一下自己的修改：git diff       
提交到暂存区：git add new.js       -----多个文件git add . ---撤销add操作，将文件从暂存区撤回git reset HEAD filename
确认将要被提交的修改包括:git stasus
暂存区提交到head：git commit -m '添加新文件'   ----多个文件git commit -am ""
此时git status则是no commit了，也就是工作目录干净了
更新远端仓库最新的代码到本地（也可以采用rebase的方式）：git pull origin master
推送更改到远端master分支：git push origin master（gsr）

总结：
要随时掌握工作区的状态，使用git status命令。
如果git status告诉你有文件被修改过，用git diff可以查看修改内容。

同时：
git pull 是git fetch（更加安全）和git merge FETCH_HEAD的缩写。
git pull --rebase则是运行git rebase而不是git merge

注意：
git merge和git rebase的区别
git merge是合并，将分支中的共同祖先和两个分支的最新提交三方合并，生成一个新的commit
git rebase是不生成新的commit，相当于在master分支上的修改在分支上复制了一边一样。

##### 2.版本回退

首先git log 查看日志
git log :命令显示从最近到最远的提交日志，我们可以看到3次提交
git log --pretty=oneline :输出信息过多，只希望一行显示

回退到上个版本
git reset --hard HEAD^
回退到上上个版本
git reset --hard HEAD^
git reset --hard HEAD~100（100个版本前）
回退到某个指定版本
$ git reset --hard 3628164

但是如果想回退回来
git reflog :用来记录你的每一次命令,可以找到原来的commitId然后在git reset --hard恢复即可

总结：
HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，
使用命令git reset --hard commit_id。
穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。

##### 3.相关撤销操作

**git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。**

git checkout  -- filename             ---撤销工作目录中的文件修改（还未git add）--git add之前被称为工作区
git reset HEAD filename               ---撤销 git add 操作（将文件从暂存区撤回）--git add之后被称为暂存区
git reset --[hard|soft] 0d1d7fc32     ---撤销未push的提交，撤销某次提交
git reset --[hard|soft] HEAD^         ---撤销上一次提交
git revert  a867b4af                  ---撤销已push的提交，产生一次新的提交记录

--rm删除文件，并且删除完后提交，但是如果删错了想恢复就用git checkout
$ git rm test.txt
rm 'test.txt'
$ git commit -m "remove test.txt"
--恢复
$ git checkout -- test.txt

git  reset  --hard
回退以前的某个版本

##### 4.分支管理

其实分支创建和合并就是改变head指针指向的地方

创建分支：git checkout -b <name>
add和commit之后
合并分支：git merge <name>
删除分支：git branch -d <name>

##### 5.发生冲突

add,commit和git pull --rebase合并之后发生冲突
则手动解决冲突之后
git add .---会更新这些内容的索引，然后，无需执行git commit就可以执行
git rebase --continue

在任何时候，你可以用--abort参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态。
git rebase --abort

#### 6.中间没有change-id

git reset 先回到没有change-id的版本
git commit --amend将后边的提交amend到此版本上
