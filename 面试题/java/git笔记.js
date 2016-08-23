集中化的版本控制系统:（ Centralized Version Control Systems，简称 CVCS ）
    可以让不同系统上的开发者协同工作，
    但是单一的集中管理服务器保存所有文件的修正版本，容易单点故障造成所有数据的丢失；
分布式版本控制系统（ Distributed Version Control System，简称 DVCS ）:
    比如git，客户端并不只提取最新版本的文件快照，而是把代码仓库完整地镜像下来。
    这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。因为每一次的提取操作，实际上都是一次对代码仓库的完整备份
基本的 Git 工作流程如下：
    1.在工作目录中修改某些文件。
    2.对修改后的文件进行快照，然后保存到暂存区域。
    3.提交更新，将保存在暂存区域的文件快照永久转储到 Git 目录中。
git目录：
    每个项目都有一个 Git 目录（译注：如果 git clone 出来的话，就是其中 .git 的目录；如果 git clone --bare 的话，新建的目录本身就是 Git 目录。），它是 Git 用来保存元数据和对象数据库的地方。
    该目录非常重要，每次克隆镜像仓库的时候，实际拷贝的就是这个目录里面的数据。
工作目录：
    从项目中取出某个版本的所有文件和目录，用以开始后续工作的叫做工作目录。这些文件实际上都是从 Git 目录中的压缩对象数据库中提取出来的，接下来就可以在工作目录中对这些文件进行编辑。
暂存区域：
    所谓的暂存区域只不过是个简单的文件，一般都放在 Git 目录中。有时候人们会把这个文件叫做索引文件，不过标准说法还是叫暂存区域。
我们可以从文件所处的位置来判断状态：
    如果是 Git目录中保存着的特定版本文件，就属于已提交状态；如果作了修改并已放入暂存区域，就属于已暂存状态；如果自上次取出后，作了修改但还没有放到暂存区域，就是已修改状态。

    在开始菜单里找到“Git”->“Git Bash”

    $ git config --global user.name "Your Name"
    $ git config --global user.email "email@example.com"
    $ git config --list 是查询配置列表

    初始化一个Git仓库，使用git init命令。

    添加文件到Git仓库，分两步：

    第一步，使用命令git add <file>，注意，可反复多次使用，添加多个文件；

    第二步，使用命令git commit，完成。

task9问题：
    我们团队做完各自部分，在task9合并的时候，发现一个part出现了问题，合并时有冲突，原因应该就是我push之前没有pull！

    首先冲突发生时，使用

        $ git status

    可以查看冲突的文件

    并且打开文件内容，git会用<<<<<<,======,>>>>>>标记不同分支内容，现在可以修改冲突文件，然后commit

    但是发现历史版本是正确了，不想修改冲突怎么办呢？

    现在就在悲催的寻找历史版本了！

        $git log

    ![log-show](https://github.com/ohowcl/ife/blob/pics/1.png?raw=true)

    输入上述命令查询历史版本，但是信息太多了，我就想看流水线啊，于是

        $git log --pretty=oneline

    这样一个版本就显示一行（包含版本号+说明）

    ![log-show1](https://github.com/ohowcl/ife/blob/pics/2.png?raw=true)

    假设现在版本是3，想返回到之前版本2

        $git reset --hard HEAD^(返回上个版本)

        $git reset --hard HEAD~100(返回之前第100个版本)


    此时git log发现没有版本3了，那如果想返回3版本呢？

        $ git reset --hard commit-id(版本号)

    ps：

    git reset --soft：回退到某个版本，只回退commit信息，不恢复index file一级

    git reset --hard：彻底回退到某个版本，本地源码也会变成上一个版本的内容

    但如果不知道版本号呢？git提供了记录每次命令的命名

        $git reflog

    这样查询到我们需要的版本号，使用reset则我们可以找回版本3了
